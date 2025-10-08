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
        <PanelBody title={__('Text Shadow', 'your-textdomain')} initialOpen={false}>
            <ToggleControl
                label={__('Enable Shadow', 'your-textdomain')}
                checked={!!shadow.enabled}
                onChange={(enabled) => update('enabled', enabled)}
            />
            {shadow.enabled && (
                <>
                    <RangeControl
                        label={__('Horizontal Offset (px)', 'your-textdomain')}
                        value={shadow.x}
                        onChange={(x) => update('x', x)}
                        min={-20}
                        max={20}
                    />
                    <RangeControl
                        label={__('Vertical Offset (px)', 'your-textdomain')}
                        value={shadow.y}
                        onChange={(y) => update('y', y)}
                        min={-20}
                        max={20}
                    />
                    <RangeControl
                        label={__('Blur (px)', 'your-textdomain')}
                        value={shadow.blur}
                        onChange={(blur) => update('blur', blur)}
                        min={0}
                        max={50}
                    />
                    <ColorPalette
                        label={__('Shadow Color', 'your-textdomain')}
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