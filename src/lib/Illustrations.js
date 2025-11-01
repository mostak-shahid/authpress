/**
 * Illustrations.js
 * Location: wp-content/plugins/authpress/src/lib/Illustrations.js
 * Description: Centralized SVG illustration components for Authpress plugin.
 */

import React from "react";

/**
 * 💤 Idle Illustration (example)
 */
export const IllustrationIdle = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        fill="none"
        {...props}
    >
        <circle cx="100" cy="100" r="90" stroke="#0073aa" strokeWidth="8" fill="#e5f5ff" />
        <path
            d="M60 120c10-20 30-30 50-30s40 10 50 30"
            stroke="#0073aa"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <circle cx="80" cy="80" r="5" fill="#0073aa" />
        <circle cx="120" cy="80" r="5" fill="#0073aa" />
    </svg>
);

/**
 * ⚠️ 404 Illustration (example)
 */
export const Illustration404 = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        fill="none"
        {...props}
    >
        <rect width="200" height="200" rx="20" fill="#ffe8e8" />
        <text
            x="50%"
            y="50%"
            textAnchor="middle"
            fontSize="64"
            fontWeight="bold"
            fill="#e63946"
            dy=".35em"
        >
            404
        </text>
    </svg>
);

/**
 * 🖼️ Image Not Found Illustration (example)
 */
export const IllustrationImageNotFound = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        fill="none"
        {...props}
    >
        <rect width="200" height="200" rx="20" fill="#f5f5f5" />
        <path
            d="M40 150l40-50 40 30 40-60 40 80H40z"
            fill="#d3d3d3"
            stroke="#999"
            strokeWidth="2"
        />
        <circle cx="80" cy="70" r="10" fill="#ccc" />
    </svg>
);

/**
 * Default export for convenient import
 */
export default {
    IllustrationIdle,
    Illustration404,
    IllustrationImageNotFound,
};
