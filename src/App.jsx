import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import ColorForm from "./Components/ColorForm/ColorForm";
import { useState } from "react";
import { nanoid } from "nanoid";

function App() {
  const [colors, setColors] = useState(initialColors);

  function handleAddColor(newColor) {
    setColors([{ id: nanoid(), ...newColor }, ...colors]);
  }

  function handleDeleteColor(id) {
    const newColors = colors.filter((color) => color.id !== id);
    setColors(newColors);
  }
  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onSubmitColor={handleAddColor} />
      {colors.length < 1 && <h4>No colors. Start by adding one!</h4>}
      {colors.map((color) => {
        return (
          <Color key={color.id} color={color} onDelete={handleDeleteColor} />
        );
      })}
    </>
  );
}

export default App;
