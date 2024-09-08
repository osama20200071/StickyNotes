import NotesContext from "./context/NotesContext";
import NotesPage from "./pages/NotesPage";

function App() {
  return (
    <main id="app">
      <NotesContext>
        <NotesPage />
      </NotesContext>
    </main>
  );
}

export default App;
