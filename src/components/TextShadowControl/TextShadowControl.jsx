import { __ } from '@wordpress/i18n';
import {
    PanelBody,
    RangeControl,
    ColorPalette,
    ToggleControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

const TextShadowControl = ({ value = {}, onChange }) => {
    const [shadow, setShadow] = useState(value);

    const update = (key, val) => {
        const newShadow = { ...shadow, [key]: val };
        setShadow(newShadow);
        onChange(newShadow);
    };

    return (
        <PanelBody title={__('Text Shadow', 'authpress')} initialOpen={false}>
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
                        min={-20}
                        max={20}
                    />
                    <RangeControl
                        label={__('Vertical Offset (px)', 'authpress')}
                        value={shadow.y}
                        onChange={(y) => update('y', y)}
                        min={-20}
                        max={20}
                    />
                    <RangeControl
                        label={__('Blur (px)', 'authpress')}
                        value={shadow.blur}
                        onChange={(blur) => update('blur', blur)}
                        min={0}
                        max={50}
                    />
                    <ColorPalette
                        label={__('Shadow Color', 'authpress')}
                        value={shadow.color}
                        onChange={(color) => update('color', color)}
                    />
                </>
            )}
        </PanelBody>
    );
};

export default TextShadowControl;
//Usage Example
{/* <TextShadowControl
    value={attributes.textShadow}
    onChange={(textShadow) => setAttributes({ textShadow })}
/> */}