import { useState, useEffect } from "react";
import "./Color.css";
import ColorForm from "../ColorForm/ColorForm";

export default function Color({ color, onDelete, onEditColor }) {
  const [showMessage, setShowMessage] = useState(false); //Tracks if the delete confirmation is shown
  const [isEdit, setIsEdit] = useState(false); //trackks if card is in edit mode
  const [hasCopied, setHasCopied] = useState(false); //Tracks if the hex value has been successfully copied.

  //Finds the color by its ID and updates it with new data.
  function handleEditColor(currColor) {
    onEditColor(color.id, currColor); //gives back the new updated color with the original ID
    setIsEdit(false); // will exit Edit mode
  }

  async function writeClipboardText() {
    try {
      await navigator.clipboard.writeText(color.hex);
      setHasCopied(true);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    const timer = setInterval(() => setHasCopied(false), 3000);

    return () => {
      clearInterval(timer);
    };
  }, [hasCopied]);

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-headline">{color.hex}</h3>
      {hasCopied ? (
        <div className="color-card-confirmation">Succesfully copied!</div>
      ) : (
        <button onClick={writeClipboardText}>COPY</button>
      )}
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>

      {/* UPDATE+CANCEL_EDIT */}
      {isEdit && !showMessage && (
        <>
          <ColorForm
            colorToUpdate={color}
            onEditColor={handleEditColor}
            onCancel={() => setIsEdit(false)}
          />
          <button
            onClick={() => {
              setIsEdit(false);
            }}
          >
            CANCEL
          </button>
        </>
      )}

      {/* CANCEL_DELETE+CONFIRM_DELETE */}
      {showMessage && !isEdit && (
        <>
          <div className="color-card-headline">Really delete?</div>
          <button onClick={() => setShowMessage(false)}>CANCEL</button>
          {/* when cancel is clicked, onClicking event will trigger the arrow function 
          and change state to false */}
          <button onClick={() => onDelete(color.id)}>DELETE</button>
        </>
      )}

      {/* DELETE+EDIT */}
      {!showMessage && !isEdit && (
        <>
          <button onClick={() => setShowMessage(true)}>DELETE</button>
          {/* Delete button triggers onclick function, 
        executes the arrow function, updates/ changes state to true and 
        jumps to the above condition to be executed.  */}
          <button onClick={() => setIsEdit(true)}>EDIT</button>
        </>
      )}
    </div>
  );
}
