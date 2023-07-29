import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import StyledTextfield from './StyledTextfield';
import { cyan } from '@mui/material/colors';
  
export default function CustomizedSelects(props) {

    return (
        <FormControl variant="standard">
            <StyledTextfield
                select
                label="Categories"
                id="customized-select"
                onChange={props.handleChange}
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
                {props.item.map(item => (
                    <MenuItem value={item.value}>{item.name}</MenuItem>
                ))}
            </StyledTextfield>          
        </FormControl>
    );
}