import { useState } from "react";
import Trash from "../Icons/Trash";
import { db } from "../appwrite/databases";
import Modal from "./Modal";
import { useNotesContext } from "../context/NotesContext";

const DeleteButton = ({ noteId }) => {
  const [openModal, setOpenModal] = useState(false);
  const { setNotes } = useNotesContext();

  const deleteNoteHandler = async () => {
    let response = await db.notes.delete(noteId);
    console.log(response);
    setNotes((prev) => prev.filter((note) => note.$id !== noteId));
  };

  return (
    <>
      <button
        className="delete-button"
        onClick={() => setOpenModal(true)}
        style={{
          cursor: "pointer",
          backgroundColor: "transparent",
          border: "none",
        }}
      >
        <Trash />
      </button>
      {openModal && (
        <Modal
          onCancel={() => setOpenModal(false)}
          onConfirm={deleteNoteHandler}
        />
      )}
    </>
  );
};

export default DeleteButton;
