import React, { useState } from "react";

const TextShadow = ({ options = ["offsetX", "offsetY", "blur", "color"], defaultValues = {}, name, handleChange }) => {
  const [values, setValues] = useState(defaultValues);

  const updateValue = (option, value) => {
    const updated = { ...values, [option]: value };
    setValues(updated);

    // Build CSS shorthand string for preview/use
    const shadowString = `${updated.offsetX || 0}px ${updated.offsetY || 0}px ${updated.blur || 0}px ${updated.color || "#000000"}`;

    handleChange(name, { ...updated, css: shadowString });
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <div className="grid grid-cols-2 gap-3">
        {options.includes("offsetX") && (
          <div>
            <label className="font-medium">Offset X</label>
            <input
              type="number"
              value={values.offsetX || 0}
              onChange={(e) => updateValue("offsetX", e.target.value)}
              className="border rounded px-2 py-1 w-full"
            />
          </div>
        )}

        {options.includes("offsetY") && (
          <div>
            <label className="font-medium">Offset Y</label>
            <input
              type="number"
              value={values.offsetY || 0}
              onChange={(e) => updateValue("offsetY", e.target.value)}
              className="border rounded px-2 py-1 w-full"
            />
          </div>
        )}

        {options.includes("blur") && (
          <div>
            <label className="font-medium">Blur</label>
            <input
              type="number"
              value={values.blur || 0}
              onChange={(e) => updateValue("blur", e.target.value)}
              className="border rounded px-2 py-1 w-full"
            />
          </div>
        )}

        {options.includes("color") && (
          <div>
            <label className="font-medium">Color</label>
            <input
              type="color"
              value={values.color || "#000000"}
              onChange={(e) => updateValue("color", e.target.value)}
              className="form-control"
            />
          </div>
        )}
      </div>

      {/* Live preview */}
      <div
        className="mt-4 p-3 border rounded text-lg font-bold text-center"
        style={{
          textShadow: `${values.offsetX || 0}px ${values.offsetY || 0}px ${values.blur || 0}px ${
            values.color || "#000000"
          }`,
        }}
      >
        Preview Text
      </div>
    </div>
  );
};

export default TextShadow;
