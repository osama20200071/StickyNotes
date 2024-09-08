import { db } from "../appwrite/databases";
import { useNotesContext } from "../context/NotesContext";

const Color = ({ color }) => {
  const { selectedNote, setNotes } = useNotesContext();

  const changeColor = async () => {
    // console.log("CHange color clicked:", color);

    // make sure there is a note selected first
    if (!selectedNote) {
      return;
    }

    try {
      setNotes((prev) => {
        return prev.map((note) => {
          if (note.$id === selectedNote) {
            return {
              ...note,
              colors: JSON.stringify(color),
            };
          }
          return note;
        });
      });

      await db.notes.update(
        {
          colors: JSON.stringify(color),
        },
        selectedNote
      );
    } catch (error) {
      console.log("failed to update color on the db");
      // alert("You must select a note before changing colors");
    }

    // here we need to change the color of the selected note
  };

  return (
    <div
      onClick={changeColor}
      className="color"
      style={{ backgroundColor: color.colorHeader }}
    ></div>
  );
};

export default Color;

// old approach the problem is i change the
// const changeColor = async () => {
//   // console.log("CHange color clicked:", color);

//   // make sure there is a note selected first
//   if (!selectedNote) {
//     return;
//   }

//   try {

//     setNotes((prev) => {
//       return prev.map((note) => {
//         if (note.$id === selectedNote) {
//           return {
//             ...note,
//             colors: JSON.stringify(color),
//           };
//         }
//         return note;
//       });
//     });

//     await db.notes.update(
//       {
//         colors: JSON.stringify(color),
//       },
//       selectedNote
//     );
//   } catch (error) {
//     console.log("failed to update color on the db");
//     // alert("You must select a note before changing colors");
//   }

//   // here we need to change the color of the selected note
// };
