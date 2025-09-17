import React, { useState, useEffect } from "react";

const RgbaColorPicker = ({ defaultValues = { color: "#ff0000", alpha: 1 }, name, defaultColor = "#ff0000", defaultAlpha = 1, mood = "rgba", handleChange }) => {
    // Initialize selected values with defaultValues
    const [values, setValues] = useState(defaultValues);

    const updateValue = (option, value) => {
        const updated = { ...values, [option]: value };
        setValues(updated);
        handleChange(name, updated);
    };
  const [color, setColor] = useState(defaultColor);
  const [alpha, setAlpha] = useState(defaultAlpha);

  // Convert HEX → RGB
  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  const rgba = () => {
    const { r, g, b } = hexToRgb(color);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

    // keep sync when defaultValues change
  useEffect(() => {
    setValues(defaultValues);
  }, [defaultValues]);

  return (
    <div className="mb-3">
      <label className="form-label">Pick RGBA Color</label>
      <div className="d-flex align-items-center gap-3">
        {/* Color picker */}
        <input
          type="color"
          value={values.color}
          onChange={(e) => updateValue('color',e.target.value)}
          className="form-control form-control-color"
        />
        {
        mood == 'rgba' ?
            <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={values.alpha}
            onChange={(e) => updateValue('alpha',parseFloat(e.target.value))}
            className="form-range w-25"
            />
        : null
        }

        {/* Output */}
        <input type="text" value={rgba()} readOnly className="form-control w-50" />
      </div>

      {/* Preview Box */}
      <div
        className="mt-3 p-3 text-white fw-bold text-center rounded"
        style={{ background: rgba() }}
      >
        Preview Box
      </div>
    </div>
  );
};

export default RgbaColorPicker;
