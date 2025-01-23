import { useState } from "react";
import "./Color.css";
import ColorForm from "../ColorForm/ColorForm";

export default function Color({ color, onDelete, onEditColor }) {
  const [showMessage, setShowMessage] = useState(false); //state for the confirmation messsage mainly to states of Cancel and delete
  const [isEdit, setIsEdit] = useState(false); //state to State to track the updated color details while editing

  //Finds the color by its ID and updates it with new data.
  function handleEditColor(currColor) {
    onEditColor(color.id, currColor); //gives back the new updated color with the original ID
    setIsEdit(false); // will exit Edit mode
  }

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-headline">{color.hex}</h3>
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
