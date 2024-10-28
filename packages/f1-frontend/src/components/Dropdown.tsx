import React, {useState} from 'react';

export interface DropDownOption {
    label: string;
    value: string | number;
}

export interface DropDownProps {
    label: string,
    options: DropDownOption[],
    onChange: (year:number) => void,
    disabled?: boolean,
}

export function Dropdown({label, options, onChange, disabled}: DropDownProps) {
    const [selectedOption, setSelectedOption] = useState('');

    const getDropDownOptions = () => {
        return options.map(option => (
            <option value={option.value} key={option.value}>{option.label}</option>
        ));
    }

    const handleSelectChange = (event: any) => {
        setSelectedOption(event.target.value);
        onChange(event.target.value);
    };

    return (
        <select id="dropdown" value={selectedOption} onChange={handleSelectChange} disabled={disabled}>
            <option value="">{label}</option>
            {getDropDownOptions()}
        </select>
    );
}