import React, { useContext, useState } from "react";
import {
  Drawer,
  List,
  ListItemText,
  Toolbar,
  Divider,
  ListItemButton,
  ListItemIcon,
  useTheme,
  useMediaQuery,
  IconButton,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LoginIcon from "@mui/icons-material/Login"
import MenuIcon from "@mui/icons-material/Menu"
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import { UserContext } from "../App";

const DrawerCustom = () => {

  const navigate = useNavigate()
  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { userData } = useContext(UserContext)

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <>
     {isSmallScreen ? (
        <IconButton onClick={toggleDrawer} sx={{ color: 'white', position: 'fixed', top: 10, left: 10 }}>
          <MenuIcon />
        </IconButton>
      ) : null}
    <Drawer
    variant={isSmallScreen ? 'temporary' : 'permanent'}
    open={openDrawer}
    onClose={toggleDrawer}
      sx={{
        width: {xs: "60%",sm: "30%", md: "25%", lg: "16%"},
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: {xs: "60%",sm: "30%", md: "25%", lg: "16%"},
          boxSizing: "border-box",
          backgroundColor: "#f4f4f4",
          padding: "0.5%",
          color: "white",
          backgroundColor: "#0B0D0E",
        },
      }}
    >
      <Toolbar>
          <AccountCircleIcon sx={{ width: 33, height: 33, color: 'wheat' }}/>
          <Typography sx={{ marginLeft: 1, fontSize: 22 }}>
            {userData?.username}
          </Typography>
        </Toolbar>
      <Divider sx={{ backgroundColor: 'wheat' }}/>
      <List>
        {[
          { text: "HomePage", icon: <HomeIcon />, onClick: () => {navigate("/"); toggleDrawer()} },
          { text: "Transaction History", icon: <AccountBalanceWalletIcon />, onClick: () => {navigate("/transactions"); toggleDrawer()} },
          { text: "Login", icon: <LoginIcon />, onClick: () => {navigate("/login"); toggleDrawer()}}
        ].map((item, index) => (
          <ListItemButton
            key={item.text}
            sx={{
              padding: "8px 16px",
              "&:hover": { backgroundColor: "black" },
              "&.Mui-selected": {
                backgroundColor: "#d0d0d0",
                "&:hover": { backgroundColor: "#c0c0c0" },
              },
              borderRadius: 4,
              marginTop: "5%",
            }}
            onClick={item.onClick}
          >
            <ListItemIcon sx={{ minWidth: 36, color: "white" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>

    </>
  );
};

export default DrawerCustom;
