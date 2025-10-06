// src/lib/Constants.js
import { __ } from "@wordpress/i18n";
export const UNITS = [
    { value: 'px', label: 'px' },
    { value: '%', label: '%' },
    { value: 'em', label: 'em' },
    { value: 'rem', label: 'rem' },
    { value: 'vw', label: 'vw' },
];

export const DEFAULT_BORDER = {
    color: '#72aee6',
    style: 'dashed',
    width: '1px',
};

export const COLORS = [
    { name: 'Blue 20', color: '#72aee6' },
    { name: 'Pink Flare', color: '#E1C0C8' },
    { name: 'Carissma', color: '#EA88A8' },
    { name: 'Ash', color: '#A09998' },
];

export const FONT_SIZES = [
    {
        name: __('Small'),
        slug: 'small',
        size: 12,
    },
    {
        name: __('Big'),
        slug: 'big',
        size: 26,
    },
];
