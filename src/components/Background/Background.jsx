import { __ } from '@wordpress/i18n';
import { useEffect, useState } from 'react';
import Colorpicker from '../Colorpicker/Colorpicker'
import MediaUploader from '../MediaUploader/MediaUploader'
import { SelectControl } from '@wordpress/components';
const Background = ({options, defaultValues = {}, name, handleChange}) => {
    // Initialize selected values with defaultValues
    const [values, setValues] = useState(defaultValues);

    const updateValue = (option, value) => {
        const updated = { ...values, [option]: value };
        setValues(updated);
        handleChange(name, updated);
    };

    // Predefined select options for background-related CSS properties
    const selectOptions = {
        position: ["left top", "left center", "left bottom", "center top", "center", "center bottom", "right top", "right center", "right bottom"],
        size: ["auto", "cover", "contain"],
        repeat: ["repeat", "repeat-x", "repeat-y", "no-repeat"],
        origin: ["padding-box", "border-box", "content-box"],
        clip: ["border-box", "padding-box", "content-box", "text"],
        attachment: ["scroll", "fixed", "local"],
    };
    return (
        <>
            <div className="background-wrapper">
                <div className="row">
                {options.map((option) => (
                    <div key={option} className={`mb-2 from-group from-group-${option} col-${(option === 'image' || option === 'color') ? '12' : '6'}`}>
                        <label className="form-label text-capitalize">{option}</label>
                        {/* color → color picker */}
                        {option === "color" && (
                            <Colorpicker
                                type="color"
                                defaultValue={values[option]}
                                handleChange={(value) => updateValue(option, value)}
                                className="form-control"
                                mode='color'
                            />
                        )}

                        {/* image → external component */}
                        {option === "image" &&  (
                            <MediaUploader 
                                data={values?.image? values.image : {id:0, url:''}} 
                                name={`${name}.image`}
                                handleChange={handleChange}
                                options = {{
                                    frame:{
                                        title: __("Select or Upload Image", "authpress"),
                                    },
                                    library: {type: 'image'},
                                    buttons: {
                                        upload: __("Upload Image", "authpress"),
                                        remove: __("Remove", "authpress"),
                                        select: __("Use this image", "authpress")                                            
                                    }
                                }}
                            />
                        )}
                            {/* rest → select dropdown */}
                            {option !== "color" && option !== "image" && (                                
                                <SelectControl
                                    // label="Size"
                                    value={ values[option] || "" }
                                    options={selectOptions[option]?.map((val) => ({ label: val, value: val })) || []}
                                    onChange={(value) => updateValue(option, value)}
                                    __next40pxDefaultSize
                                    __nextHasNoMarginBottom
                                />                                 
                            )} 
                    </div>
                ))}
                    
                </div>
            </div>
        </>
    );    
}
export default Background;