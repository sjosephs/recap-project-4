import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import ColorForm from "./Components/ColorForm/ColorForm";
import useLocalStorageState from "use-local-storage-state";
import { nanoid } from "nanoid";

function App() {
  //const [colors, setColors] = useState(initialColors);
  const [colors, setColors] = useLocalStorageState("colors", {
    defaultValue: initialColors,
  });

  function handleAddColor(newColor) {
    setColors([{ id: nanoid(), ...newColor }, ...colors]);
  }

  function handleDeleteColor(id) {
    const newColors = colors.filter((color) => color.id !== id);
    setColors(newColors);
  }
  // Creats a New Array with Updated Colors
  function handleEditColor(id, newColordata) {
    const newColors = colors.map(
      (color) => (color.id === id ? { ...color, ...newColordata } : color) // If new `color.id` matches the given `id`, it creates a new object by spreading and overwriting the existing `color` object with `newColordata` using the spread. So properties in `newColordata` will overwrite the properties in the `color` object.
    );
    setColors(newColors);
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onSubmitColor={handleAddColor} />
      {colors.length < 1 && <h4>No colors. Start by adding one!</h4>}
      {colors.map((color) => {
        return (
          <Color
            key={color.id}
            color={color}
            onDelete={handleDeleteColor}
            onEditColor={handleEditColor}
          />
        );
      })}
    </>
  );
}

export default App;
