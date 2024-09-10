import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../appwrite/databases";
import Spinner from "../Icons/Spinner";
import { useTheme } from "./ThemeContext";
import { Query } from "appwrite";
import { useAuth } from "./AuthContext";

const notesContext = createContext({
  setNotes: () => {},
  setSelectedNote: () => {},
  notes: [],
  selectedNote: null,
});

export const useNotesContext = () => useContext(notesContext);

function NotesContext({ children }) {
  let [notes, setNotes] = useState([]);
  let [loading, setLoading] = useState(true);
  let [selectedNote, setSelectedNote] = useState(null);
  let { theme } = useTheme();
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      // const response = await db.notes.list();
      const response = await db.notes.list([Query.equal("user_id", user.$id)]);
      setNotes(response.documents);
      setLoading(false);
    };

    fetchData();
  }, []);

  console.log(notes);

  const ctx = {
    notes,
    setNotes,
    selectedNote,
    setSelectedNote,
  };

  return (
    <notesContext.Provider value={ctx}>
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Spinner size="100" color={theme === "dark" ? "#fff" : "#222"} />
        </div>
      ) : (
        children
      )}
    </notesContext.Provider>
  );
}

export default NotesContext;
