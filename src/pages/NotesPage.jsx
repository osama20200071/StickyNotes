import NoteCard from "../components/NoteCard";

import { useNotesContext } from "../context/NotesContext";
import Controls from "../components/Controls";

function NotesPage() {
  const { notes } = useNotesContext();

  return (
    <>
      {notes.map((note) => (
        <NoteCard note={note} key={note.$id} />
      ))}

      <Controls />
    </>
  );
}

export default NotesPage;
