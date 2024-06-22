import React, { useContext } from "react";
import { Typography, Paper } from "@mui/material";
import { UserContext } from "../../App";

const MainBoard = () => {

  const userName = localStorage.getItem('userCred')
  const { userData } = useContext(UserContext);

  return (
      <Paper
        elevation={3}
        sx={{
          height: "100%",
          borderRadius: 8,
          padding: 4,
          border: "1px solid #ddd",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          boxSizing: "border-box",
          color: "white",
          backgroundColor: "#050505",
          borderColor: "#847E6A",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          Welcome back, {userName || userData?.username}
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: 1 }}>
          Account Balance
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Rs. {userData?.balanceAmount}
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: 1, marginTop: 2}}>
          Reserved Amount
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Rs. {userData?.reservedFunds}
        </Typography>
      </Paper>
  );
};

export default MainBoard;
