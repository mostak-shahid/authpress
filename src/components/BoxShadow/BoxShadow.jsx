import React, { useState, useEffect } from "react";

import Checkbox from '../Checkbox/Checkbox'
const BoxShadow = ({
  options = {},
  defaultValues = {},
  name,
  handleChange,
  allowNegative=true,
}) => {
    const [values, setValues] = useState({
        offsetX: 0,
        offsetY: 0,
        blur: 0,
        spread: 0,
        color: "",
        inset: false,
        ...defaultValues,
    });

    // const [values, setValues] =  useState([]);
    // useEffect(() => {
    //     setSelectedValues(defaultValues);
    // }, [defaultValues]); // Include all dependencies

    const shadow = `${values.inset ? "inset " : ""}${values.offsetX}px ${
        values.offsetY
    }px ${values.blur}px ${values.spread}px ${values.color}`;

    // Sync with parent
    useEffect(() => {
        handleChange?.(name, { ...values, css: shadow });
    }, [values]);

    const updateValue = (key, val) => {
        const updated = { ...values, [key]: val };
        setValues(updated);
    };

    return (
        <div className="boxshadow-builder p-3 border rounded">
        {/* Preview */}
        <div
            className="shadow-preview mb-3"
            style={{
                width: "100%",
                height: "120px",
                borderRadius: "8px",
                background: "#fff",
                boxShadow: shadow,
            }}
        />

        {/* Controls */}
        <div className="row g-2">
            <div className="col-6">
            <label className="form-label">Offset X</label>
            <input
                type="number"
                className="form-control"
                value={values.offsetX}
                onChange={(e) =>
                    updateValue("offsetX", allowNegative ? parseInt(e.target.value) || 0 : Math.max(0, parseInt(e.target.value) || 0))
                }
            />
            </div>
            <div className="col-6">
            <label className="form-label">Offset Y</label>
            <input
                type="number"
                className="form-control"
                value={values.offsetY}
                onChange={(e) =>
                    updateValue("offsetY", allowNegative ? parseInt(e.target.value) || 0 : Math.max(0, parseInt(e.target.value) || 0))
                }
            />
            </div>
            <div className="col-6">
            <label className="form-label">Blur</label>
            <input
                type="number"
                className="form-control"
                value={values.blur}
                min="0"
                onChange={(e) => updateValue("blur", Math.max(0, parseInt(e.target.value) || 0))}
            />
            </div>
            <div className="col-6">
            <label className="form-label">Spread</label>
            <input
                type="number"
                className="form-control"
                value={values.spread}
                onChange={(e) =>
                    updateValue("spread", allowNegative ? parseInt(e.target.value) || 0 : Math.max(0, parseInt(e.target.value) || 0))
                }
            />
            </div>
            <div className="col-12">
            <label className="form-label">Color</label>
            <input
                type="color"
                className="form-control"
                value={
                values.color.startsWith("rgba")
                    ? "#000000" // fallback if rgba
                    : values.color
                }
                onChange={(e) => updateValue("color", e.target.value)}
            />
            <input
                type="text"
                className="form-control mt-1"
                value={values.color}
                onChange={(e) => updateValue("color", e.target.value)}
            />
            </div>
                     
            <div className={`checkbox-group checkbox-group-block mt-2`}>
                <div className={`form-check ps-0`}>
                    <input
                        className="form-check-input"
                        type='checkbox' // Use the `type` prop
                        
                        id={`${name}-inset`}
                        checked={values.inset}
                        onChange={(e) => updateValue("inset", e.target.checked)}
                    />
                    <div className="content">
                        <label className="form-check-label" htmlFor={`${name}-inset`} dangerouslySetInnerHTML={{ __html: 'Inset'}}/>
                    </div>
                </div>
            </div>
        </div>

        {/* Output */}
        <div className="mt-3">
            <label className="form-label">CSS:</label>
            <pre className="p-2 bg-light border rounded small">box-shadow: {shadow};</pre>
        </div>
        </div>
    );
};

export default BoxShadow;
//uses
{/* <BoxShadow
    name="cardShadow"
    defaultValues={{
        offsetX: 0,
        offsetY: 8,
        blur: 20,
        spread: 0,
        color: "rgba(0,0,0,0.25)",
        inset: false,
    }}
    handleChange={handleShadowChange}
/> */}