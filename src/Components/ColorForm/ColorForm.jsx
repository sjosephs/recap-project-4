import { useState } from "react";
import ColorInput from "../ColorInput/ColorInput";

export default function ColorForm({
  onSubmitColor,
  onEditColor,
  colorToUpdate,
}) {
  const [role, setRole] = useState(colorToUpdate ? colorToUpdate.role : "");
  // If there's a color we're updating, role gets that value else empty role
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (colorToUpdate) {
      // update a color
      onEditColor(data);
      console.log("should update color", data, colorToUpdate.id);
    } else {
      // adding a color
      onSubmitColor(data);
    }
    //console.log("Data: ", data);
    //console.log("Event:", event.target);

    event.target.reset();
  }

  function handleInputValue(event) {
    setRole(event.target.value);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__fields">
        <div className="form__field">
          <label className="form__label" htmlFor="role">
            Role
          </label>
          <br />
          <input
            className="form__input"
            id="role"
            type="text"
            name="role"
            value={role} // Controlled input
            onChange={handleInputValue}
            placeholder="some color"
            required
          />
          <br />
        </div>
        <div className="form__field">
          <label className="form__label" htmlFor="hex">
            Hex
          </label>
          <br />
          {/*If colorToUpdate exists, it initializes the input with colorToUpdate.hex */}
          {colorToUpdate ? (
            <ColorInput name="hex" initialValue={colorToUpdate.hex} />
          ) : (
            <ColorInput name="hex" />
          )}

          <br />
        </div>

        <div className="form__field">
          <label className="form__label" htmlFor="contrastText">
            Contrast Text
          </label>
          <br />

          {colorToUpdate ? (
            <ColorInput
              name="contrastText"
              initialValue={colorToUpdate.contrastText}
            />
          ) : (
            <ColorInput name="contrastText" />
          )}
        </div>
        <br />
        <button type="submit" className="form__button">
          {colorToUpdate ? "UPDATE" : "ADD"} COLOR
        </button>
      </div>
    </form>
  );
}
