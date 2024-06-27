import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import { TextFieldStyle } from "../../constants/Constants";
import { useNavigate } from "react-router-dom";
import SlideSnackbar from "../../components/SlideSnackbar";
import { userLoginAction } from "../../actions/authAction";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Login Failed !");

  const handleSubmit = async () => {
    if (username && password) {
      const data = {
        username,
        password,
      };
      const loginHandle = await userLoginAction(data);
      if (loginHandle.success) {
        localStorage.setItem("userCred", loginHandle.login.username);
        navigate("/");
      } else {
        setSnackbarOpen(true);
        setSnackbarMessage(loginHandle.message);
      }
    } else {
      setSnackbarOpen(true);
      setSnackbarMessage("Please fill all fields");
    }
  };

  const handleRedirect = () => {
    navigate("/page-register");
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: "100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "white",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          margin="normal"
          fullWidth
          sx={{
            marginBottom: 2,
            width: "100%",
            borderRadius: 20,
            ...TextFieldStyle,
          }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="off"
        />
        <TextField
          label="Password"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
          sx={{
            marginBottom: 2,
            width: "100%",
            borderRadius: 20,
            ...TextFieldStyle,
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Login
        </Button>
        <Typography variant="h6" sx={{ margin: "5%" }}>
          Dont have an account ? <Link onClick={handleRedirect}>Register</Link>
        </Typography>
      </Box>

      <SlideSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        handleClose={handleCloseSnackbar}
        autoHideDuration={2500}
      />
    </Container>
  );
};

export default LoginPage;
