import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import StyledTextfield from './StyledTextfield';
import { cyan } from '@mui/material/colors';
  
export default function CustomizedSelects() {
const [age, setAge] = React.useState('');
const handleChange = (event) => {
    setAge(event.target.value);
};
return (
    <FormControl variant="standard">
        <StyledTextfield
            select
            label="Categories"
            id="customized-select"
            value={age}
            onChange={handleChange}
            SelectProps={{
                sx: {
                    "& .MuiSvgIcon-root": {
                        color: "white",
                    }
                },
                MenuProps: {
                    sx: {
                        "& .MuiMenu-paper": {
                            backgroundColor: 'rgb(54, 54, 54)',
                            color: '#fff'
                        },
                        "& .MuiMenuItem-root:hover": {
                            backgroundColor: cyan[300]+'!important'
                        },
                        "&& .Mui-selected": {
                            backgroundColor: cyan[500]
                        }
                    },
                    disableScrollLock: true
                }
            }}
        >
        <MenuItem value="">
            None
        </MenuItem>
        <MenuItem value={10}>Inspirational Ideas</MenuItem>
        <MenuItem value={20}>Game design</MenuItem>
        <MenuItem value={30}>Diary</MenuItem>
        </StyledTextfield>          
    </FormControl>
);
}