import React, { ReactNode } from 'react';
import { TextField, MenuItem } from '@mui/material';

type PropagateToChildrenProps = {
    children: ReactNode;
    [key: string]: any;
};

export const PropagateToChildren: React.FC<PropagateToChildrenProps> = ({ children, ...props }) => {
    return React.Children.map(children, child => {
        return React.isValidElement(child) ? React.cloneElement(child, { ...props }) : child;
    });
};

export interface Option {
    value: string;
    name: string;
}

type QuickTextFieldProps = {
    name: string;
    label?: string;
    type?: string;
    required?: boolean;
    fields?: { [key: string]: any };
    errors?: { [key: string]: any };
    isSubmitted?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    [x: string]: any; // This line allows the component to accept any other standard prop
};

type QuickSelectFieldProps = QuickTextFieldProps & {
    options?: Option[] | null; // Replace 'prop1' with the name of your property
    // optionName?: string; // Replace 'prop2' with the name of your property
    // optionValue?: string; // Replace 'prop3' with the name of your property
};



export const QuickTextField: React.FC<QuickTextFieldProps> = (props) => {
    const { name, type, required, fields = {}, errors, isSubmitted, onChange, ...otherProps } = props;
    let { label } = props;
    label = label || name; // If label is undefined, use name as the label
    const value = name in fields ? fields[name] : '';
    const helperText = isSubmitted && errors && name ? errors[name] : undefined;
    const error = isSubmitted && errors && name ? !!errors[name] : undefined;

    return (
        <TextField
            name={name}
            {...(label && { label })}
            value={value}
            {...(onChange && { onChange })}
            {...(helperText && { helperText })}
            {...(error !== undefined && { error })}
            {...(required !== undefined && { required })}
            {...(type && { type })}
            InputLabelProps={{
                shrink: true,
            }}
            {...otherProps} // Spread other standard props
        />
    );
};



export const QuickDateField: React.FC<QuickTextFieldProps> = (props) => {
    const { name, type, required, fields = {}, errors, isSubmitted, onChange, ...otherProps } = props;
    let { label } = props;
    label = label || name; // If label is undefined, use name as the label
    const value = name in fields ? fields[name] : '';
    const helperText = isSubmitted && errors && name ? errors[name] : undefined;
    const error = isSubmitted && errors && name ? !!errors[name] : undefined;

    return (
        <TextField
            name={name}
            {...(label && { label })}
            value={value}
            {...(onChange && { onChange })}
            {...(helperText && { helperText })}
            {...(error !== undefined && { error })}
            {...(required !== undefined && { required })}
            {...(type && { type })}
            InputLabelProps={{
                shrink: true,
            }}
            type={"date"}
            {...otherProps} // Spread other standard props
        />
    );
};

export const QuickSelectField: React.FC<QuickSelectFieldProps> = (props) => {
    const { name, type, required, fields = {}, errors, isSubmitted, onChange, options, optionName, optionValue, ...otherProps } = props;
    let { label } = props;
    label = label || name; // If label is undefined, use name as the label
    const value = name in fields ? fields[name] : '';
    const helperText = isSubmitted && errors && name ? errors[name] : undefined;
    const error = isSubmitted && errors && name ? !!errors[name] : undefined;

    return (
        <TextField
            name={name}
            {...(label && { label })}
            value={value}
            {...(onChange && { onChange })}
            {...(helperText && { helperText })}
            {...(error !== undefined && { error })}
            {...(required !== undefined && { required })}
            {...(type && { type })}
            InputLabelProps={{
                shrink: true,
            }}
            select
            {...otherProps} // Spread other standard props
        >
            {options?.map((option: Option) => (
                //optionValue !== undefined && option[optionValue] !== undefined && optionName !== undefined && option[optionName] !== undefined ?
                <MenuItem key={option.value} value={option.value}>
                    {option.name}
                </MenuItem>
            ))}
            <MenuItem value="" key="">
                <em>-empty-</em>
            </MenuItem>
        </TextField>
    );
};

export const QuickTimeField: React.FC<QuickTextFieldProps> = (props) => {
    const { name, type, required, fields = {}, errors, isSubmitted, onChange, ...otherProps } = props;
    let { label } = props;
    label = label || name; // If label is undefined, use name as the label
    const value = name in fields ? fields[name] : '';
    const helperText = isSubmitted && errors && name ? errors[name] : undefined;
    const error = isSubmitted && errors && name ? !!errors[name] : undefined;

    return (
        <TextField
            name={name}
            {...(label && { label })}
            value={value}
            {...(onChange && { onChange })}
            {...(helperText && { helperText })}
            {...(error !== undefined && { error })}
            {...(required !== undefined && { required })}
            {...(type && { type })}
            InputLabelProps={{
                shrink: true,
            }}
            type={"time"}
            {...otherProps} // Spread other standard props
        />
    );
};






