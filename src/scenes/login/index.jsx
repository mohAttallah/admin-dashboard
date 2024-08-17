import { FormControl, Box, Button, IconButton, Typography, TextField, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import Header from "../../components/Header";

const Login = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleSubmit = (event) => {
        event.preventDefault();
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
                        sx={{ border: 1, borderColor: 'rgba(76, 206, 172, 0.5)', p: 5, borderRadius: '5%' }}
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
                        <TextField color="secondary" id="outlined-basic" label="Email" variant="outlined" required
                            sx={{ width: '35vw', height: '50px' }} />
                        <TextField color="secondary" id="outlined-basic" label="Password" variant="outlined" required
                            sx={{ width: '35vw', height: '50px' }}
                        />
                        <Button type="submit" variant="contained" color="secondary" sx={{ width: '7vw', height: '50px' }}>
                            <Typography variant="h6" color='white' >
                                Login
                            </Typography>
                        </Button>
                    </Box>
                </form>
            </Box>

        </Box>
    );
};

export default Login;
