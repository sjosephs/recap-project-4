import { useState } from "react";
// to handle synchronized text and color inputs, ensuring that they reflect the same value. ( Controlled Inputs )
export default function ColorInput({ name, initialValue = "#54c73d" }) {
  // State to manage the value of the input (controlled input)
  const [inputValue, setInputValue] = useState(initialValue);

  // Update state when the input value changes
  function handleInputValue(event) {
    setInputValue(event.target.value); // Syncs text and color input
  }
  return (
    <>
      {/* Text input for hex value */}
      <input
        type="text"
        id={name}
        name={name}
        value={inputValue} // Controlled input
        onChange={handleInputValue} // Sync state with changes
      />
      {/* Color picker input */}
      <input type="color" value={inputValue} onChange={handleInputValue} />
    </>
  );
}
