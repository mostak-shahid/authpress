import { __ } from '@wordpress/i18n';
import { useCallback, useEffect, useState } from 'react';
import ColorPickerControl from '../ColorPickerControl/ColorPickerControl'
import MediaUploaderControl from '../MediaUploaderControl/MediaUploaderControl'
import { SelectControl } from '@wordpress/components';

const SELECT_OPTIONS = {
    position: ["left top", "left center", "left bottom", "center top", "center", "center bottom", "right top", "right center", "right bottom"],
    size: ["auto", "cover", "contain"],
    repeat: ["repeat", "repeat-x", "repeat-y", "no-repeat"],
    origin: ["padding-box", "border-box", "content-box"],
    clip: ["border-box", "padding-box", "content-box", "text"],
    attachment: ["scroll", "fixed", "local"],
};

const BackgroundControl = ({options, defaultValues = {}, name, handleChange, className=''}) => {
    const [values, setValues] = useState(() => (
        defaultValues && typeof defaultValues === 'object' ? { ...defaultValues } : {}
    ));

    useEffect(() => {
        setValues(defaultValues && typeof defaultValues === 'object' ? { ...defaultValues } : {});
    }, [defaultValues]);

    const updateValue = useCallback((option, value) => {
        setValues(prev => {
            const updated = { ...prev, [option]: value };
            handleChange(name, updated);
            return updated;
        });
    }, [handleChange, name]);

    const handleImageChange = useCallback((_, value) => {
        setValues(prev => {
            const updated = { ...prev, image: value };
            handleChange(name, updated);
            return updated;
        });
    }, [handleChange, name]);

    const imageData = values?.image && typeof values.image === 'object'
        ? values.image
        : { id: 0, url: '', thumbnail: '' };

    return (
        <>
            <div className={`background-wrapper ${className}`}>
                <div className="row">
                {options.map((option) => (
                    <div key={option} className={`mb-2 from-group from-group-${option} col-${(option === 'image' || option === 'color') ? '12' : '6'}`}>
                        {/* color → color picker */}
                        {option === "color" && (
                            <>
                            <label className="form-label">{option}</label>
                            <ColorPickerControl
                                defaultValue={values[option]}
                                handleChange={(value) => updateValue(option, value)}
                                mode='color'
                                />
                            </>
                        )}

                        {/* image → external component */}
                        {option === "image" &&  (
                            <MediaUploaderControl 
                                data={imageData} 
                                name={`${name}.image`}
                                handleChange={handleImageChange}
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
                                    label={option}
                                    value={ values[option] || "" }
                                    options={SELECT_OPTIONS[option]?.map((val) => ({ label: val, value: val })) || []}
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
export default BackgroundControl;