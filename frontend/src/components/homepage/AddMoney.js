import { Button, Grid, TextField, Typography, Paper } from "@mui/material";
import { AddMoneyToUserAccount } from "../../actions/money_action";
import { useContext, useState } from "react";
import { TextFieldStyle } from "../../constants/Constants";
import { UserContext } from "../../App";
import SlideSnackbar from "../SlideSnackbar";

const AddMoney = () => {
  const [amountAdd, setAmountAdd] = useState("");
  const [descriptionAdd, setDescriptionAdd] = useState("");
  const { userData, setUserData } = useContext(UserContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(
    "Money added successfully !"
  );

  const handleSubmit = async () => {
    if (userData.username) {
      if (amountAdd && descriptionAdd) {
        const data = {
          username: userData.username,
          amount: amountAdd,
          description: descriptionAdd,
          transactionType: "Debit",
        };
        console.log(userData);
        const response = await AddMoneyToUserAccount(data);
        const state = {
          username: userData.username,
          balanceAmount: response.balanceAmount,
        };
        setUserData(state);
        setAmountAdd("");
        setDescriptionAdd("");
        setSnackbarOpen(true);
      }
    } else {
      setSnackbarMessage("Please Login to use this")
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    setSnackbarOpen(false);
  };

  return (
    <Grid item xs={6} sx={{ height: "100%" }}>
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 8,
          border: "1px solid #ddd",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          color: "white",
          backgroundColor: "#050505",
          borderColor: "#847E6A",
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Add Money
        </Typography>
        <TextField
          sx={{
            marginBottom: 2,
            width: "100%",
            borderRadius: 20,
            ...TextFieldStyle,
          }}
          id="amount"
          label="Amount"
          type="number"
          variant="outlined"
          value={amountAdd}
          onChange={(event) => {
            setAmountAdd(event.target.value);
          }}
        />

        <TextField
          sx={{
            marginBottom: 2,
            width: "100%",
            borderRadius: 20,
            ...TextFieldStyle,
          }}
          id="description"
          label="Description"
          variant="outlined"
          color="secondary"
          value={descriptionAdd}
          onChange={(event) => {
            setDescriptionAdd(event.target.value);
          }}
        />

        <Button
          variant="contained"
          sx={{ alignSelf: "flex-start", marginTop: 2 }}
          onClick={handleSubmit}
        >
          Add Money
        </Button>
      </Paper>

      <SlideSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        handleClose={handleCloseSnackbar}
      />
    </Grid>
  );
};

export default AddMoney;
