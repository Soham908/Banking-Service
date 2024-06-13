import React, { useContext, useEffect } from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { UserContext } from "../../App";
import axios from "axios";

const MainBoard = () => {

  const userName = localStorage.getItem('userCred')
  const { userData, setUserData } = useContext(UserContext);
  const port = process.env.REACT_APP_BACKEND_PORT_URL
  
  useEffect(() => {
    const userDataFetch = async () => {
      const url = port + "/userMoney/balance/" + userName;
      const response = await axios.get(url);
      const data = {
        username: userName,
        balanceAmount: response.data.balanceAmount
      }
      setUserData(data);
    };
    userDataFetch();
  }, []);

  return (
    <Grid item xs={12} sx={{ height: "50%" }}>
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
      </Paper>
    </Grid>
  );
};

export default MainBoard;
