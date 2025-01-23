import { useState } from "react";
import "./Color.css";
import { initialColors } from "../../lib/colors";

export default function Color({ color, onDelete }) {
  const [showMessage, setShowMessage] = useState(false); //state for the confirmation messsage mainly to states of Cancel and delete

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

      {showMessage ? (
        <>
          <div className="color-card-headline">Really delete?</div>
          <button onClick={() => setShowMessage(false)}>CANCEL</button>
          {/* when cancel is clicked, onClicking event will trigger the arrow function 
          and change state to false */}
          <button onClick={() => onDelete(color.id)}>DELETE</button>
        </>
      ) : (
        <button onClick={() => setShowMessage(true)}>DELETE</button>
        /* Delete button triggers onclick function, 
        executes the arrow function, updates/ changes state to true and 
        jumps to the above condition to be executed.  */
      )}
    </div>
  );
}
