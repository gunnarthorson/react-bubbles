import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [addColor, setAddColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
axiosWithAuth()
.put(`colors/${colorToEdit.id}`, colorToEdit)
.then(res => {
  axiosWithAuth()
  .get('colors/')
  .then(res => updateColors(res.data))
})
.catch(err => console.log(err));
  };

  const deleteColor = color => {
   axiosWithAuth()
   .delete(`/colors/${color.id}`)
   .then(res => {
    axiosWithAuth()
    .get('colors/')
    .then(res => {
      updateColors(res.data)
    })
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  })
};

  const addColors = e => {
    e.preventDefault();
    axiosWithAuth()
    .post('colors/', addColor)
    .then(res => {
      updateColors(res.data)
    })
  }

  return (
  <div className="colors-wrap">
    <p>colors</p>
    <div>
      <form name="addColor">
        <legend>Add Color</legend>
            <label>
              color name:
              <input
                onChange={e =>
                  setAddColor({ ...addColor, color: e.target.value })
                }
                value={addColor.color}
              />
            </label>
            <label>
              hex code:
              <input
                onChange={e =>
                  setAddColor({
                    ...addColor,
                    code: { hex: e.target.value }
                  })
                }
                value={addColor.code.hex}
              />
            </label>
            <div className="button-row">
              <button onClick={addColors}>Add</button>
            </div>
          </form>
        </div>
    <ul>
      {colors.map(color => (
        <li key={color.color} onClick={() => editColor(color)}>
          <span>
            <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
    </div>
  );
};

export default ColorList;
