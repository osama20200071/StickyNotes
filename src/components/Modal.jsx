import { useState } from "react";

function Modal({ onConfirm, onCancel }) {
  const [deleting, setDeleting] = useState(false);

  const handleConfirm = () => {
    console.log("clicked");
    setDeleting(true);
    onConfirm();
  };

  return (
    <div className="confirm-modal">
      <p>Are you sure to delete this note?</p>
      <div>
        <button
          onClick={handleConfirm}
          className={deleting ? "delete" : ""}
          disabled={deleting}
        >
          {deleting ? "Deleting.." : "Confirm"}
        </button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default Modal;
