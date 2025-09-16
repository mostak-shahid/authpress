import { __ } from '@wordpress/i18n';
import { useEffect, useState } from 'react';
const Measurement = ({options, defaultValues = {}, allowNegative=false, name, handleChange}) => {
    // Initialize selected values with defaultValues
    const [values, setValues] = useState(defaultValues);

    const updateValue = (option, value) => {
        const updated = { ...values, [option]: value };
        setValues(updated);
        handleChange(name, updated);
    };

    return (
        <>
            <div className="background-wrapper">
                {options.map((option) => (
                    <div key={option} className={`mb-2 from-group from-group-${option}`}>
                        <label className="form-label text-capitalize">{option}</label>
                        {/* color → color picker */}
                        {
                            option === "unit" ? (
                                <select 
                                    className="form-select"
                                    value={values[option] ?? "px"} 
                                    onChange={(e) => updateValue(option, e.target.value)}
                                >
                                    <option>px</option>
                                    <option>%</option>
                                    <option>em</option>
                                    <option>rem</option>
                                    <option>vw</option>
                                    <option>vh</option>
                                </select> 
                            ) : (
                                <div class="input-group">
                                    <input 
                                        type="number" 
                                        step="any"
                                        className="form-control"
                                        value={values[option] || ""}
                                        min={allowNegative? "": "0"}
                                        onChange={(e) => updateValue(option, e.target.value)}
                                    />
                                    <span className="input-group-text">{values['unit']??'px'}</span>
                                </div>
                            )
                        }
                    </div>
                ))}
            </div>
        </>
    );    
}
export default Measurement;
