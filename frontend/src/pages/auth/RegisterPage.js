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
import { userRegister } from "../../actions/userAuthAction";
import { useNavigate } from "react-router-dom";
import SlideSnackbar from "../../components/SlideSnackbar";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(
    "Please fill all fields !"
  );

  const handleSubmit = async () => {
    if (username && password) {
      const data = {
        username,
        password,
      };
      const registerHandle = await userRegister(data);
      if (registerHandle.success) {
        localStorage.setItem("userCred", registerHandle.register.username);
        navigate("/");
      }
    } else {
      setSnackbarOpen(true)
    }
  };

  const handleRedirect = () => {
    navigate("/login");
  };

  const handleCloseSnackbar = (event, reason) => {
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
          Register
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
          Register
        </Button>
        <Typography variant="h6" sx={{ margin: "5%" }}>
          Already have an account ? <Link onClick={handleRedirect}>Login</Link>
        </Typography>
      </Box>

      <SlideSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        handleClose={handleCloseSnackbar}
      />
    </Container>
  );
};

export default RegisterPage;
