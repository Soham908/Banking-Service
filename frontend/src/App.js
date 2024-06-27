import { useEffect } from "react";
import { Box } from "@mui/material";
import HomePage from "./pages/HomePage";
import DrawerCustom from "./components/DrawerCustom";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import TransactionHistory from "./pages/TransactionHistory";
import ProfilePage from "./pages/ProfilePage";
import NotificationPage from "./pages/NotificationPage";
import { checkAccountBalanceAction } from "./actions/moneyAction";
import { useUserDataStore } from "./store/store";

const App = () => {
  
  const username = localStorage.getItem("userCred");
  const setUserDataToStore = useUserDataStore(
    (state) => state.setStoreUserData
  );

  useEffect(() => {
    const userDataFetch = async () => {
      const response = await checkAccountBalanceAction(username);
      const data = {
        username: username,
        balanceAmount: response?.balanceAmount,
        reservedFunds: response?.reservedFunds,
      };
      setUserDataToStore(data);
    };
    userDataFetch();
  }, []);

  return (
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
          <Route path="/notifications" element={<NotificationPage />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
