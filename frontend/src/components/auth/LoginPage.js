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
import { userLogin } from "../../actions/userAuthAction";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (username && password) {
      const data = {
        username,
        password,
      };
      const loginHandle = await userLogin(data);
      if (loginHandle.success) {
        localStorage.setItem("userCred", loginHandle.login.username);
        navigate("/");
      }
    }
  };

  const handleRedirect = () => {
    navigate("/page-register");
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
    </Container>
  );
};

export default LoginPage;
