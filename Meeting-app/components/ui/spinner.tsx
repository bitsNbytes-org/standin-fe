// Spinner.tsx
import React from 'react';
import { FC } from 'react';

// Import FC for Functional Component typing

/**
 * Defines the props for the Spinner component.
 * It expects an optional 'className' string.
 */
interface SpinnerProps {
  className?: string; // Optional string for additional Tailwind classes
}

/**
 * A simple loading spinner component using SVG and Tailwind CSS for animation and styling.
 *
 * @param {SpinnerProps} props - The component props.
 * @returns {JSX.Element} The SVG spinner element.
 */
const Spinner: FC<SpinnerProps> = ({ className }) => {
  return (
    <svg
      // Note: In React/Next.js (JSX/TSX), 'class' is replaced with 'className'
      className={`text-theme-green animate-spin ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25" // Using className
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4" // Using camelCase for stroke-width
      ></circle>
      <path
        className="opacity-75" // Using className
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

export default Spinner;
