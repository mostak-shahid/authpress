import React, { useState, useEffect } from "react";

const Gradient = ({ options = {}, defaultValues = {}, name, handleChange }) => {
  // Default state
  const [type, setType] = useState(defaultValues.type || "linear");
  const [angle, setAngle] = useState(defaultValues.angle || 90);
  const [stops, setStops] = useState(
    defaultValues.stops || [
      { color: "#ef709b", position: 0 },
      { color: "#fa9372", position: 100 },
    ]
  );

  // Build gradient string
  const gradient = `${type}-gradient(${type === "linear" ? angle + "deg, " : ""}${stops
    .map((s) => `${s.color} ${s.position}%`)
    .join(", ")})`;

  // Notify parent
  useEffect(() => {
    handleChange?.({
      name,
      value: gradient,
      type,
      angle,
      stops,
    });
  }, [gradient]);

  // Add new stop
  const addStop = () => {
    setStops([...stops, { color: "#ffffff", position: 50 }]);
  };

  // Update stop color
  const updateStopColor = (index, value) => {
    const updated = [...stops];
    updated[index].color = value;
    setStops(updated);
  };

  // Update stop position
  const updateStopPosition = (index, value) => {
    let pos = Math.min(100, Math.max(0, parseInt(value) || 0));
    const updated = [...stops];
    updated[index].position = pos;
    setStops(updated);
  };

  // Remove stop
  const removeStop = (index) => {
    if (stops.length > 2) {
      setStops(stops.filter((_, i) => i !== index));
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
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="linear">Linear</option>
          <option value="radial">Radial</option>
        </select>
      </div>

      {/* Angle (linear only) */}
      {type === "linear" && (
        <div className="mb-2">
          <label className="form-label me-2">Angle:</label>
          <input
            type="number"
            className="form-control d-inline w-auto"
            value={angle}
            min="0"
            max="360"
            onChange={(e) => setAngle(parseInt(e.target.value) || 0)}
          />
        </div>
      )}

      {/* Stops */}
      <div className="mb-2">
        <label className="form-label d-block">Stops:</label>
        {stops.map((stop, i) => (
          <div key={i} className="d-flex align-items-center mb-2">
            {/* Color Picker */}
            <input
              type="color"
              value={stop.color}
              className="form-control form-control-color me-2"
              onChange={(e) => updateStopColor(i, e.target.value)}
            />
            {/* Color Hex */}
            <input
              type="text"
              value={stop.color}
              className="form-control me-2"
              onChange={(e) => updateStopColor(i, e.target.value)}
            />
            {/* Position */}
            <input
              type="number"
              value={stop.position}
              min="0"
              max="100"
              className="form-control me-2"
              style={{ width: "80px" }}
              onChange={(e) => updateStopPosition(i, e.target.value)}
            />
            <span className="me-2">%</span>
            {/* Remove button */}
            {stops.length > 2 && (
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
