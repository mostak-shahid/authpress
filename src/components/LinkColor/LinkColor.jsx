import { __ } from '@wordpress/i18n';
import { useEffect, useState } from 'react';
const LinkColor = ({options, defaultValues = {}, name, handleChange}) => {
    // Initialize selected values with defaultValues
    const [values, setValues] = useState(defaultValues);

    const updateValue = (option, value) => {
        const updated = { ...values, [option]: value };
        setValues(updated);
        handleChange(name, updated);
    };
    return (
        <>
            <div className="border-wrapper d-flex flex-wrap align-items-center gap-2 ">
                {options.map((option) => (
                    <div key={option} className={`from-group from-group-${option}`}>
                        {/* color → color picker */}
                        {
                            <div class="input-group">
                                <input
                                    type="color"
                                    value={values[option] || "#000000"}
                                    onChange={(e) => updateValue(option, e.target.value)}
                                    className="form-control"
                                />
                                <span className="input-group-text text-capitalize">{option}</span>
                            </div>
                        }
                    </div>
                ))}
            </div>
        </>
    );
}
export default LinkColor;