import React, { createContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import HomePage from "./components/homepage/HomePage";
import DrawerCustom from "./components/DrawerCustom";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import TransactionHistory from "./components/TransactionHistory";
import ProfilePage from "./components/ProfilePage";

export const UserContext = createContext();

const App = () => {
  
  const [userData, setUserData] = useState();
  const username = localStorage.getItem('userCred')

  useEffect(() => {
    if(!username){
      setUserData("")
    }
  }, [])

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <DrawerCustom />

        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, backgroundColor: "black" }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/page-register" element={<RegisterPage />} />
            <Route path="/transactions" element={<TransactionHistory />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Box>
      </Box>
    </UserContext.Provider>
  );
};

export default App;
