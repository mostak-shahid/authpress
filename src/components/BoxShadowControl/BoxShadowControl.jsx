import { __ } from '@wordpress/i18n';
import {
    ToggleControl,
    __experimentalUnitControl as UnitControl, 
} from '@wordpress/components';
import {useState} from 'react';
import Colorpicker from '../Colorpicker/Colorpicker';

const units = [
    { value: 'px', label: 'px' },
    // { value: '%', label: '%' },
    // { value: 'em', label: 'em' },
    // { value: 'rem', label: 'rem' },
    // { value: 'vw', label: 'vw' },
];
const BoxShadowControl = ({ value = {}, onChange, className='' }) => {
    const [shadow, setShadow] = useState(value);

    const update = (key, val) => {
        const newShadow = { ...shadow, [key]: val };
        setShadow(newShadow);
        onChange(newShadow);
    };

    return (
        <div className={`box-shadow-wrapper ${className}`}>
            <div className="d-flex justify-content-end mb-2">
                
                <ToggleControl
                    label={__('Enable Box Shadow', 'authpress')}
                    checked={!!shadow.enabled}
                    onChange={(enabled) => update('enabled', enabled)}
                />
            </div> 
            {shadow.enabled && (
                <>
                    <UnitControl
                        __next40pxDefaultSize 
                        label={__('Horizontal Offset (px)', 'authpress')}
                        value={shadow.x}
                        onChange={(x) => update('x', x)}
                        min={-50}
                        max={50}
                        units={units}
                        className='mb-2'
                    />
                    <UnitControl
                        __next40pxDefaultSize 
                        label={__('Vertical Offset (px)', 'authpress')}
                        value={shadow.y}
                        onChange={(y) => update('y', y)}
                        min={-50}
                        max={50}
                        units={units}
                        className='mb-2'
                    />
                    <UnitControl
                        __next40pxDefaultSize 
                        label={__('Blur (px)', 'authpress')}
                        value={shadow.blur}
                        onChange={(blur) => update('blur', blur)}
                        min={0}
                        max={100}
                        units={units}
                        className='mb-2'
                    />
                    <UnitControl
                        __next40pxDefaultSize 
                        label={__('Spread (px)', 'authpress')}
                        value={shadow.spread}
                        onChange={(spread) => update('spread', spread)}
                        min={-50}
                        max={50}
                        units={units}
                        className='mb-2'
                    />
                    <Colorpicker
                        defaultValue={shadow.color || "#000000"}
                        handleChange={(color) => update('color', color)}
                        mode='color'
                        label={__('Shadow Color', 'authpress')}
                    /> 
                    <ToggleControl
                        label={__('Inset', 'authpress')}
                        checked={!!shadow.inset}
                        onChange={(inset) => update('inset', inset)}
                    />
                </>
            )}
        </div>
    );
};

export default BoxShadowControl;
// Usage Example

// <BoxShadowControl
//     value={attributes.boxShadow}
//     onChange={(boxShadow) => setAttributes({ boxShadow })}
// />