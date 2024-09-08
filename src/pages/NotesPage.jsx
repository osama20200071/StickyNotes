import NoteCard from "../components/NoteCard";
import { useTheme } from "../context/ThemeContext";
import sun from "../assets/sun.svg";
import moon from "../assets/moon.svg";
import { useNotesContext } from "../context/NotesContext";
import Controls from "../components/Controls";

function NotesPage() {
  const { theme, toggleTheme } = useTheme();
  const { notes } = useNotesContext();
  const icon = theme === "dark" ? moon : sun;

  return (
    <>
      <div className="theme-icon" onClick={toggleTheme}>
        <img src={icon} alt="" />
      </div>
      {notes.map((note) => (
        <NoteCard note={note} key={note.$id} />
      ))}

      <Controls />
    </>
  );
}

export default NotesPage;
