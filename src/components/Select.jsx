import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SelectComponent = ({ label, value, onChange, options }) => {
    return (
        <FormControl fullWidth>
            <InputLabel id={`${label}-select-label`} sx={{ color: "#fff" }}>
                {label}
            </InputLabel>
            <Select
                labelId={`${label}-select-label`}
                id={`${label}-select`}
                value={value}
                onChange={onChange}
                label={label}
                sx={{
                    color: "white",
                    height: '40px', 
                    '.MuiOutlinedInput-notchedOutline': {
                        borderColor: '#fff',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#fff',
                    },
                    '.MuiSvgIcon-root': {
                        color: 'white',
                    }
                }}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            backgroundColor: '#333',
                            color: 'white',
                        },
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem
                        key={option.value}
                        value={option.value}
                        sx={{
                            color: 'white',
                        }}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectComponent;