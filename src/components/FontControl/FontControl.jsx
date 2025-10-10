import { __ } from '@wordpress/i18n';
import {
    PanelBody,
    RangeControl,
    SelectControl,
    ColorPalette,
    TextControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

const FontControl = ({ value = {}, onChange }) => {
    const [font, setFont] = useState(value);

    const update = (key, val) => {
        const newFont = { ...font, [key]: val };
        setFont(newFont);
        onChange(newFont);
    };

    return (
        <PanelBody title={__('Font Settings', 'authpress')} initialOpen={true}>
            <ColorPalette
                label={__('Font Color', 'authpress')}
                value={font.color}
                onChange={(color) => update('color', color)}
            />
            <RangeControl
                label={__('Font Size (px)', 'authpress')}
                value={font.size}
                onChange={(size) => update('size', size)}
                min={8}
                max={100}
            />
            <RangeControl
                label={__('Line Height', 'authpress')}
                value={font.lineHeight}
                onChange={(lineHeight) => update('lineHeight', lineHeight)}
                min={0.8}
                max={3}
                step={0.1}
            />
            <SelectControl
                label={__('Font Weight', 'authpress')}
                value={font.weight}
                onChange={(weight) => update('weight', weight)}
                options={[
                    { label: 'Default', value: '' },
                    { label: 'Normal', value: '400' },
                    { label: 'Bold', value: '700' },
                    { label: 'Light', value: '300' },
                ]}
            />
            <SelectControl
                label={__('Font Style', 'authpress')}
                value={font.style}
                onChange={(style) => update('style', style)}
                options={[
                    { label: 'Normal', value: 'normal' },
                    { label: 'Italic', value: 'italic' },
                    { label: 'Oblique', value: 'oblique' },
                ]}
            />
            <SelectControl
                label={__('Text Align', 'authpress')}
                value={font.textAlign}
                onChange={(textAlign) => update('textAlign', textAlign)}
                options={[
                    { label: 'Left', value: 'left' },
                    { label: 'Center', value: 'center' },
                    { label: 'Right', value: 'right' },
                    { label: 'Justify', value: 'justify' },
                ]}
            />
            <SelectControl
                label={__('Text Transform', 'authpress')}
                value={font.textTransform}
                onChange={(textTransform) => update('textTransform', textTransform)}
                options={[
                    { label: 'None', value: 'none' },
                    { label: 'Uppercase', value: 'uppercase' },
                    { label: 'Lowercase', value: 'lowercase' },
                    { label: 'Capitalize', value: 'capitalize' },
                ]}
            />
            <SelectControl
                label={__('Text Decoration', 'authpress')}
                value={font.textDecoration}
                onChange={(textDecoration) => update('textDecoration', textDecoration)}
                options={[
                    { label: 'None', value: 'none' },
                    { label: 'Underline', value: 'underline' },
                    { label: 'Overline', value: 'overline' },
                    { label: 'Line-through', value: 'line-through' },
                ]}
            />
        </PanelBody>
    );
};

export default FontControl;

// Usage Example
// <FontControl
//     value={attributes.font}
//     onChange={(font) => setAttributes({ font })}
// />