import React from "react";
import {
  Drawer,
  List,
  ListItemText,
  Toolbar,
  Divider,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LoginIcon from "@mui/icons-material/Login"
import { useNavigate } from "react-router-dom";

const DrawerCustom = () => {

  const navigate = useNavigate()

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: "17%",
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: "17%",
          boxSizing: "border-box",
          backgroundColor: "#f4f4f4",
          padding: "0.5%",
          color: "white",
          backgroundColor: "#0B0D0E",
        },
      }}
    >
      <Toolbar />
      <Divider />
      <List>
        {[
          { text: "HomePage", icon: <HomeIcon />, onClick: () => {navigate("/")} },
          { text: "Transaction History", icon: <AccountBalanceWalletIcon />, onClick: () => {navigate("/transactions")} },
          { text: "Login", icon: <LoginIcon />, onClick: () => {navigate("/login")}}
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
  );
};

export default DrawerCustom;
