import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";

function App() {
  return (
    <>
      <h1>Theme Creator</h1>

      {initialColors.map((color) => {
        return <Color key={color.id} color={color} />; // calls the Color Component with a unique key
      })}
    </>
  );
}

export default App;
