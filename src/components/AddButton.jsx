import { useRef, useState } from "react";
import Plus from "../Icons/Plus";
import colors from "../assets/colors.json";
import { db } from "../appwrite/databases";
import { useNotesContext } from "../context/NotesContext";
import { Permission, Role } from "appwrite";
import { useAuth } from "../context/AuthContext";

const AddButton = () => {
  const startPositionRef = useRef(10);
  const { setNotes, setSelectedNote } = useNotesContext();
  const [adding, setAdding] = useState(false);
  const { user } = useAuth();
  // const currentNotes = useRef(notes);

  const addNote = async () => {
    setAdding(true);
    const payload = {
      position: JSON.stringify({
        x: startPositionRef.current,
        y: startPositionRef.current,
      }),

      colors: JSON.stringify(colors[0]),
      user_id: user.$id,
    };

    startPositionRef.current += 20;
    const permissions = [Permission.write(Role.user(user.$id))];

    try {
      let response = await db.notes.create(payload, permissions);
      setNotes((prev) => [...prev, response]);
      setSelectedNote(response.$id);
    } catch (error) {
      console.log("failed to create note", error);
      // setNotes(currentNotes.current);
    }
    setAdding(false);
  };

  return (
    <button id="add-btn" onClick={addNote} className={adding ? "spinner" : ""}>
      <Plus />
    </button>
  );
};

export default AddButton;
