import React, { ReactNode } from 'react';
import { TextField } from '@mui/material';

type PropagateToChildrenProps = {
    children: ReactNode;
    [key: string]: any;
};

export const PropagateToChildren: React.FC<PropagateToChildrenProps> = ({ children, ...props }) => {
    return React.Children.map(children, child => {
        return React.isValidElement(child) ? React.cloneElement(child, { ...props }) : child;
    });
};



type QuickTextFieldProps = {
    name: string;
    label?: string;
    type?: string;
    required?: boolean;
    fields?: { [key: string]: any };
    errors?: { [key: string]: any };
    isSubmitted?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const QuickTextField: React.FC<QuickTextFieldProps> = (props) => {
    const { name, type, required, fields, errors, isSubmitted, onChange } = props;
    let { label } = props;
    label = label || name; // If label is undefined, use name as the label
    const value = fields && name ? fields[name] : undefined;
    const helperText = isSubmitted && errors && name ? errors[name] : undefined;
    const error = isSubmitted && errors && name ? !!errors[name] : undefined;

    return (
        <TextField
            name={name}
            {...(label && { label })}
            {...(value && { value })}
            {...(onChange && { onChange })}
            {...(helperText && { helperText })}
            {...(error !== undefined && { error })}
            {...(required !== undefined && { required })}
            {...(type && { type })}
            InputLabelProps={{
                shrink: true,
            }}
        />
    );
};



// export const CustomTextField = ({ name, label, type, required, fields, errors, isSubmitted }) => {
//     const value = fields[name];
//     const helperText = isSubmitted && errors[name];
//     const error = isSubmitted && !!errors[name];

//     return (
//         <TextField
//             name={name}
//             label={label}
//             value={value}
//             onChange={handleInputChange}
//             helperText={helperText}
//             error={error}
//             required={required}
//             type={type}
//             InputLabelProps={{
//                 shrink: true,
//             }}
//         />
//     );
// };

// export const CustomTextField2 = ({ name, label, type, required, fields, errors, isSubmitted }) => {
//     const value = fields[name];
//     const helperText = isSubmitted && errors[name];
//     const error = isSubmitted && !!errors[name];

//     return (
//         <TextField
//             name={name}
//             label={label}
//             value={value}
//             onChange={handleInputChange}
//             helperText={helperText}
//             error={error}
//             required={required}
//             type={type}
//             InputLabelProps={{
//                 shrink: true,
//             }}
//         />
//     );
// };




