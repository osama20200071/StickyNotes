import NotesContext from "./context/NotesContext";
import NotesPage from "./pages/NotesPage";

function App() {
  return (
    <NotesContext>
      <NotesPage />
    </NotesContext>
  );
}

export default App;
