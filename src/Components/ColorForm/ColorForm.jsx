import ColorInput from "../ColorInput/ColorInput";

export default function ColorForm({ onSubmitColor }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmitColor(data);
    console.log("Data: ", data);
    console.log("Event:", event.target);

    event.target.reset();
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
          <ColorInput name="hex" intialValue="#ffffff" />
          <br />
        </div>

        <div className="form__field">
          <label className="form__label" htmlFor="contrastText">
            Contrast Text
          </label>
          <br />

          <ColorInput name="contrastText" intialValue="#ffffff" />
        </div>
        <br />
        <button type="submit" className="form__button">
          ADD COLOR
        </button>
      </div>
    </form>
  );
}
