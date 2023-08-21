import Grid from '@mui/material/Grid';
import StyledTextfield from './components/StyledTextfield';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React, {useState, useEffect, useCallback} from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [isValid, setIsValid] = useState({username: false, password: false});
    const [formError, setFormError] = useState(false);

    let navigate = useNavigate();

    const checkForm = () => {
        return (!isValid.username || !isValid.password);
    }

    const handleRegister = async () => {
        if (checkForm()) {
            setFormError(true);
            return false;
        } else {
            return await axios.post('user/Register', {
                username: username,
                password: password
            })
            .then((response) => {
                navigate(`/`);  
                console.log(response.data);
            }, (error) => {
                console.log(error);
            });
        }
    };

    useEffect(() => {
        setIsValid({
            ...isValid,
            username: !(!username)
        });
    }, [username]);

    useEffect(() => {
        setIsValid({
            ...isValid,
            password: !(!password)
        });
    }, [password]);
    
    return (
        <div className="loginWrapper">
            <div>
                <Grid container className="pageHeader">
                    <h1>Register</h1>
                </Grid>
                <Grid container className="loginContainer">
                    <Grid
                        container
                        spacing={{ xs: 2 }}
                    >
                        <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                            <StyledTextfield
                                label="Username"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                                error={formError && !isValid.username}
                                helperText="Username cannot be empty."
                            />
                        </Grid>
                        <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                            <StyledTextfield
                                label="Password"
                                value={password}
                                type="password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                error={formError && !isValid.password}
                                helperText="Password cannot be empty."
                            />
                        </Grid>                       
                        <Grid item xs={12} style={{display: 'flex', justifyContent: 'center', margin: '25px 0'}}>
                            <Button
                                variant="contained"
                                size="large"
                                sx={{ color: 'white', fontWeight: 'bold', width: '50%' }}
                                onClick={() => {
                                    handleRegister();
                                }}>
                                Register
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
