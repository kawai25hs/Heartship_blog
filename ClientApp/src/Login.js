import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import StyledTextfield from './components/StyledTextfield';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React, {useState, useEffect, useCallback} from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import date from 'date-and-time';
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "./components/useAuth";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    const [isValid, setIsValid] = useState({username: false, password: false});
    const [formError, setFormError] = useState(false);

    let navigate = useNavigate();
    const { login } = useAuth();
    const { state } = useLocation();

    const checkForm = () => {
        return (!isValid.username || !isValid.password);
    }

    const handleLogin = async () => {
        if (checkForm()) {
            setFormError(true);
            return false;
        } else {
            return await axios.post('user/Login', {
                username: username,
                password: password
            })
            .then((response) => {
                login(username).then(() => {
                    navigate(state?.path || "/");
                });
                console.log(response.data);
            }, (error) => {
                setLoginError(error.response.data);
            });
        }
        // login().then(() => {
        //     navigate(state?.path || "/");
        // });        
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
                    <h1>Login to Heartship</h1>
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
                        <Grid item xs={12} style={{display: 'flex', justifyContent: 'center', color: '#ff604f', fontSize: '16px'}}>
                            {loginError}
                        </Grid>                        
                        <Grid item xs={12} style={{display: 'flex', justifyContent: 'center', margin: '25px 0'}}>
                            <Button
                                variant="contained"
                                size="large"
                                sx={{ color: 'white', fontWeight: 'bold', width: '50%' }}
                                onClick={() => {
                                    handleLogin();
                                }}>
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
