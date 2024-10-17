import { Box, Button, IconButton, Typography, InputAdornment, TextField, useTheme, CircularProgress } from "@mui/material";
import { tokens } from "../../theme";
import { useState } from "react";
import Header from "../../components/Header";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../redux/authslice';
import SnackbarMsg, { Severity, AnchorOrigin } from '../../components/SnackbarMsg';

const Login = () => {

    const dispatch = useDispatch();
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { loading, error, msg } = useSelector((state) => state.auth);


    const handleSubmit = (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }

        if (!password || password.length < 8) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }

        if (!emailError && !passwordError) {
            dispatch(login({ email, password }));
        }
    };

    const handleEmailChange = () => {
        setEmailError(false);
    };

    const handlePasswordChange = () => {
        setPasswordError(false);
    };
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <Box m="20px"
            width="80vw"
            height="30vh"
        >
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
            </Box>
            <Box
                display="grid"
                justifyContent="center"
                alignItems="center"
                height="10vh"
                width="120%"

            >
                <form onSubmit={handleSubmit}>

                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        gap={5}
                        sx={{ border: 1, borderColor: '#3CA9FB', p: 10, borderRadius: '5%' }}
                    >
                        <Box
                            display="flex"
                            justifyContent="center"
                        >
                            <img
                                srcSet={`${"/assets/image.png"}`}
                                src={`${"/assets/image.png"}`}
                                alt={"test"}
                                loading="lazy"
                                style={{ width: '200px', height: '100px' }}
                            />

                        </Box>
                        <Typography variant="h3" gutterBottom>
                            Login
                        </Typography>
                        <TextField color="secondary" id="email" label="Email" variant="outlined"
                            sx={{ width: '35vw', height: '50px' }}
                            helperText={emailError ? "Please enter a valid email." : ""}
                            onChange={handleEmailChange}
                            error={emailError}
                        />
                        <TextField color="secondary" id="password" label="Password" variant="outlined"
                            error={passwordError}
                            type={showPassword ? "text" : "password"}
                            sx={{ width: '35vw', height: '50px' }}
                            helperText={passwordError ? "Password must be at least 8 characters." : ""}
                            onChange={handlePasswordChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={togglePasswordVisibility}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}

                        />



                        <Button type="submit" variant="contained" color="secondary" sx={{ width: '7vw', height: '50px' }}>
                            {loading ? (
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                                    <CircularProgress size={24} sx={{ color: 'white' }} />
                                </Box>
                            ) : (
                                <Typography variant="h6" color="white">
                                    Login
                                </Typography>
                            )}

                        </Button>

                        {error && <SnackbarMsg text={error} severity={Severity.ERROR} anchorOrigin={AnchorOrigin.BOTTOM_LEFT}/>}
                        {msg && <SnackbarMsg text={msg} severity={Severity.SUCCESS} anchorOrigin={AnchorOrigin.BOTTOM_LEFT}/>}

                    </Box>
                </form>
            </Box>

        </Box>
    );
};

export default Login;
