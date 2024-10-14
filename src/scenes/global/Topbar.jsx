import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import  { useState } from 'react';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import  LogoutModal from "../../components/Logout";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  }
  const  handleClose =()=>{
    setOpen(false)
  } 

  const logout = () => {
    // Add your logout logic here
    console.log('User logged out');
  };

  return (
    <Box display="flex" justifyContent="space-between" p={0.5}>
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
      </Box>
      <LogoutModal open={open} handleClose={handleClose} />

      <Box display="flex">
        {/* <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton> */}
        {/* <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton> */}
        <IconButton>
          <LogoutIcon onClick={handleOpenModal} />
        </IconButton>
        {/* <IconButton>
          <PersonOutlinedIcon />
        </IconButton> */}
      </Box>
    </Box>
  );
};

export default Topbar;
