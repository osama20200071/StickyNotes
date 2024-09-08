import { useEffect, useRef, useState } from "react";
import DeleteButton from "./DeleteButton";
import { autoGrow, bodyParser, setNewOffset, setZIndex } from "../utils";
import { db } from "../appwrite/databases";
import Spinner from "../Icons/Spinner";
import { useNotesContext } from "../context/NotesContext";

function NoteCard({ note }) {
  const [position, setPosition] = useState(JSON.parse(note.position));
  const [saving, setSaving] = useState(false);
  const textAreaRef = useRef();
  const cardRef = useRef();
  const keyUpTimer = useRef(null);

  const { setSelectedNote } = useNotesContext();

  const body = bodyParser(note.body);
  const colors = JSON.parse(note.colors);
  let mouseStartPos = { x: 0, y: 0 };

  useEffect(() => {
    autoGrow(textAreaRef);
    // setZIndex(cardRef.current);
  });

  const mouseDown = (e) => {
    setZIndex(cardRef.current);
    setSelectedNote(note.$id);
    // to only apply these to event to the header itself and ignore the delete button
    if (e.target.className === "card-header") {
      // console.log("mouse down");
      mouseStartPos.x = e.clientX;
      mouseStartPos.y = e.clientY;
      // setZIndex(cardRef.current);

      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
    }
  };

  const mouseUp = () => {
    // console.log("mouse up");
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);

    // to make sure we get the last recent position
    const newPosition = setNewOffset(cardRef.current);
    autoSave("position", newPosition);
  };

  const mouseMove = (e) => {
    // console.log("mouse move");
    //1 - Calculate move direction
    let mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    //2 - Update start position for next move.
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    // console.log(cardRef.current.offsetLeft, cardRef.current.offsetTop);
    // 3 - Update card top and left position.
    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
    setPosition(newPosition);
  };

  const autoSave = async (key, value) => {
    // setSaving(true);
    const payload = { [key]: JSON.stringify(value) };
    try {
      await db.notes.update(payload, note.$id);
    } catch (error) {
      console.error(error);
    }
    setSaving(false);
  };

  const handleKeyUp = () => {
    setSaving(true);

    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }

    keyUpTimer.current = setTimeout(() => {
      autoSave("body", textAreaRef.current.value);
    }, 2000);
  };

  return (
    <div
      ref={cardRef}
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        onMouseDown={mouseDown}
        // onMouseUp={() => autoSave("position", position)}
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
      >
        <DeleteButton noteId={note.$id} />
        {saving && (
          <div className="card-saving">
            <Spinner color={colors.colorText} />
            <span style={{ color: colors.colorText }}>Saving..</span>
          </div>
        )}
      </div>
      <div className="card-body">
        <textarea
          ref={textAreaRef}
          onInput={() => autoGrow(textAreaRef)}
          onFocus={() => {
            setZIndex(cardRef.current);
            setSelectedNote(note.$id);
          }}
          onKeyUp={handleKeyUp}
          defaultValue={body}
          style={{ color: colors.colorText }}
        ></textarea>
      </div>
    </div>
  );
}

export default NoteCard;
