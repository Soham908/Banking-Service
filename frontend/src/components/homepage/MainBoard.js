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
      console.log(userName, userData?.username);
      const url = port + "/userMoney/balance/" + userName || userData.username;
      const response = await axios.get(url);
      console.log(response.data);
      setUserData(response.data);
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
