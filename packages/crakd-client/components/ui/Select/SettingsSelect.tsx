import React, { FC, useRef, useEffect } from 'react';
import { SettingsSelectElement, Label, Description, Error } from './style';

export interface SettingsSelectProps {
    name: string;
    label: string;
    description?: string;
    autoFocus?: boolean;
    error?: string;
    [x: string]: any;
}

const SettingsSelect: FC<SettingsSelectProps> = ({ error, name, label, description, autoFocus, ...otherProps }) => {
    const inputRef = useRef(null);

    useEffect(() => {
        autoFocus && inputRef.current.focus();
    }, [autoFocus]);

    return (
        <>
            {label && <Label htmlFor={name}>{label}</Label>}
            {description && <Description>{description}</Description>}
            {error && <Error>{error}</Error>}
            <SettingsSelectElement ref={inputRef} name={name} {...otherProps} />
        </>
    );
};

export default SettingsSelect;

