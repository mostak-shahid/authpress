import { useState } from 'react';
import {
    ColorIndicator, 
    ColorPalette, 
    GradientPicker,
    Popover,
    TabPanel,
    Button,
} from '@wordpress/components';
import './Colorpicker.scss';

const colors = [
    { name: 'Blue 20', color: '#72aee6' },
    { name: 'Pink Flare', color: '#E1C0C8' },
    { name: 'Carissma', color: '#EA88A8' },
    { name: 'Ash', color: '#A09998' },
];

const gradients = [
    { name: 'Sunset', gradient: 'linear-gradient(135deg,#f00,#ff0)' },
    { name: 'Ocean', gradient: 'linear-gradient(135deg,#00f,#0ff)' },
    { name: 'Forest', gradient: 'linear-gradient(135deg,#0f0,#090)' },
];

export default function Colorpicker({ defaultValue, handleChange, mode = 'both', label='' }) {
    const [ isOpen, setIsOpen ] = useState(false);

    // dynamically choose which tabs to show
    const availableTabs = [];
    if (mode === 'color' || mode === 'both') {
        availableTabs.push({ name: 'color', title: 'Color', className: 'tab-color' });
    }
    if (mode === 'gradient' || mode === 'both') {
        availableTabs.push({ name: 'gradient', title: 'Gradient', className: 'tab-gradient' });
    }

    return (
        <div className="color-picker-wrapper">
            <Button
                variant="secondary"
                className="color-picker-button"
                aria-label="Select Color or Gradient"
                onClick={ () => setIsOpen(!isOpen) }
                style={ { border: '1px solid #ccc', color: '#ccc', gap: '10px', boxShadow: 'none' } }
            >                                   
                <ColorIndicator colorValue={ defaultValue } /> 
                <span className="color-picker-label">
                    { label? label : mode === 'color' ? 'Select Color' : mode === 'gradient' ? 'Select Gradient' : 'Select Color or Gradient' }
                </span>
            </Button>   

            { isOpen && (
                <Popover className="color-picker-popover" onClose={ () => setIsOpen(false) }>
                    <TabPanel
                        className="color-gradient-tabs"
                        activeClass="active-tab"
                        tabs={ availableTabs }
                    >
                        { ( tab ) => (
                            <>
                                { tab.name === 'color' && (
                                    <ColorPalette
                                        colors={ colors }
                                        value={ defaultValue }
                                        onChange={ ( color ) => handleChange(color) }
                                        enableAlpha={ true }
                                        asButtons={ true }
                                    /> 
                                ) }
                                { tab.name === 'gradient' && (
                                    <GradientPicker
                                        value={ defaultValue }
                                        onChange={ ( newGradient ) => handleChange(newGradient) }
                                        gradients={ gradients }
                                    />
                                ) }
                            </>
                        ) }
                    </TabPanel>
                </Popover>
            ) }
        </div> 
    );
}
