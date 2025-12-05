// Créer un label pour les formulaires
import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ children, className, ...props }) => {
    return (
        <label
            className={`block text-md font-medium dark:text-slate-700 text-slate-300 ml-2 mb-1 ${className}`}
            {...props}
        >
            {children}
        </label>
    );
};

export default Label;