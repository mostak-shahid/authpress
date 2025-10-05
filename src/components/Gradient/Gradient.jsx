import React, { useState, useEffect } from "react";

const Gradient = ({ options = {}, defaultValues = {}, name, handleChange }) => {
  // Initialize state with defaultValues
  const [values, setValues] = useState({
    type: "linear",
    angle: 90,
    stops: [
      { color: "#ef709b", position: 0 },
      { color: "#fa9372", position: 100 },
    ],
    ...defaultValues,
  });

  // Build gradient string
  const gradient = `${values.type}-gradient(${
    values.type === "linear" ? values.angle + "deg, " : ""
  }${values.stops.map((s) => `${s.color} ${s.position}%`).join(", ")})`;

  // Send updates to parent whenever values change
  useEffect(() => {
    handleChange?.(name, { ...values, css: gradient });
  }, [values]);

  // Generic updater
  const updateValue = (option, value) => {
    const updated = { ...values, [option]: value };
    setValues(updated);
  };

  // Stop helpers
  const addStop = () =>
    updateValue("stops", [...values.stops, { color: "#ffffff", position: 50 }]);

  const updateStop = (index, key, val) => {
    const updatedStops = [...values.stops];
    updatedStops[index] = { ...updatedStops[index], [key]: val };
    updateValue("stops", updatedStops);
  };

  const removeStop = (index) => {
    if (values.stops.length > 2) {
      updateValue(
        "stops",
        values.stops.filter((_, i) => i !== index)
      );
    }
  };

  return (
    <div className="gradient-builder p-3 border rounded">
      {/* Preview */}
      <div
        className="gradient-preview mb-3"
        style={{
          width: "100%",
          height: "120px",
          borderRadius: "8px",
          background: gradient,
        }}
      />

      {/* Type */}
      <div className="mb-2">
        <label className="form-label me-2">Type:</label>
        <select
          className="form-select d-inline w-auto"
          value={values.type}
          onChange={(e) => updateValue("type", e.target.value)}
        >
          <option value="linear">Linear</option>
          <option value="radial">Radial</option>
        </select>
      </div>

      {/* Angle (linear only) */}
      {values.type === "linear" && (
        <div className="mb-2">
          <label className="form-label me-2">Angle:</label>
          <input
            type="number"
            className="form-control d-inline w-auto"
            value={values.angle}
            min="0"
            max="360"
            onChange={(e) =>
              updateValue("angle", parseInt(e.target.value) || 0)
            }
          />
        </div>
      )}

      {/* Stops */}
      <div className="mb-2">
        <label className="form-label d-block">Stops:</label>
        {values.stops.map((stop, i) => (
          <div key={i} className="d-flex align-items-center mb-2">
            {/* Color Picker */}
            <input
              type="color"
              value={stop.color}
              className="form-control me-2"
              onChange={(e) => updateStop(i, "color", e.target.value)}
            />
            {/* Color Hex */}
            <input
              type="text"
              value={stop.color}
              className="form-control me-2"
              onChange={(e) => updateStop(i, "color", e.target.value)}
            />
            {/* Position */}
            <input
              type="number"
              value={stop.position}
              min="0"
              max="100"
              className="form-control me-2"
              style={{ width: "80px" }}
              onChange={(e) =>
                updateStop(i, "position", Math.min(100, Math.max(0, e.target.value)))
              }
            />
            <span className="me-2">%</span>
            {/* Remove */}
            {values.stops.length > 2 && (
              <button
                type="button"
                className="btn btn-sm btn-danger"
                onClick={() => removeStop(i)}
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="btn btn-sm btn-primary mt-2"
          onClick={addStop}
        >
          + Add Stop
        </button>
      </div>

      {/* Output */}
      <div className="mt-3">
        <label className="form-label">CSS:</label>
        <pre className="p-2 bg-light border rounded small">{gradient}</pre>
      </div>
    </div>
  );
};

export default Gradient;
