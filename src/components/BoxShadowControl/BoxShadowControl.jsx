import { __ } from '@wordpress/i18n';
import {
    PanelBody,
    RangeControl,
    ColorPalette,
    ToggleControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

const BoxShadowControl = ({ value = {}, onChange }) => {
    const [shadow, setShadow] = useState(value);

    const update = (key, val) => {
        const newShadow = { ...shadow, [key]: val };
        setShadow(newShadow);
        onChange(newShadow);
    };

    return (
        <PanelBody title={__('Box Shadow', 'authpress')} initialOpen={false}>
            <ToggleControl
                label={__('Enable Shadow', 'authpress')}
                checked={!!shadow.enabled}
                onChange={(enabled) => update('enabled', enabled)}
            />
            {shadow.enabled && (
                <>
                    <RangeControl
                        label={__('Horizontal Offset (px)', 'authpress')}
                        value={shadow.x}
                        onChange={(x) => update('x', x)}
                        min={-50}
                        max={50}
                    />
                    <RangeControl
                        label={__('Vertical Offset (px)', 'authpress')}
                        value={shadow.y}
                        onChange={(y) => update('y', y)}
                        min={-50}
                        max={50}
                    />
                    <RangeControl
                        label={__('Blur (px)', 'authpress')}
                        value={shadow.blur}
                        onChange={(blur) => update('blur', blur)}
                        min={0}
                        max={100}
                    />
                    <RangeControl
                        label={__('Spread (px)', 'authpress')}
                        value={shadow.spread}
                        onChange={(spread) => update('spread', spread)}
                        min={-50}
                        max={50}
                    />
                    <ColorPalette
                        label={__('Shadow Color', 'authpress')}
                        value={shadow.color}
                        onChange={(color) => update('color', color)}
                    />
                    <ToggleControl
                        label={__('Inset', 'authpress')}
                        checked={!!shadow.inset}
                        onChange={(inset) => update('inset', inset)}
                    />
                </>
            )}
        </PanelBody>
    );
};

export default BoxShadowControl;
// Usage Example

// <BoxShadowControl
//     value={attributes.boxShadow}
//     onChange={(boxShadow) => setAttributes({ boxShadow })}
// />