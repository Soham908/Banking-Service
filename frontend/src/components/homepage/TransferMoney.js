import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { TransferMoneyFromAccount } from "../../actions/money_action";
import { TextFieldStyle } from "../../constants/Constants";
import { UserContext } from "../../App";
import SlideSnackbar from "../SlideSnackbar";

const TransferMoney = () => {
  const [amountTransfer, setAmountTransfer] = useState("");
  const [descriptionTransfer, setDescriptionTransfer] = useState("");
  const { userData, setUserData } = useContext(UserContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(
    "Money transferred successfully !"
  );

  const handleSubmit = async () => {
    if (userData.username) {
      if (amountTransfer && descriptionTransfer) {
        const data = {
          username: userData.username,
          amount: parseInt(amountTransfer) * -1,
          description: descriptionTransfer,
        };
        const response = await TransferMoneyFromAccount(data);
        const state = {
          username: userData.username,
          balanceAmount: response.balanceAmount,
        };
        setUserData(state);
        setAmountTransfer("");
        setDescriptionTransfer("");
        setSnackbarOpen(true);
      }
    } else {
      setSnackbarMessage("Please Login to use this");
      setSnackbarOpen(true);
      setAmountTransfer("");
      setDescriptionTransfer("");
    }
  };

  const handleCloseSnackbar = () => {
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
          Transfer Money
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
          value={amountTransfer}
          onChange={(event) => {
            setAmountTransfer(event.target.value);
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
          label="Recipient"
          variant="outlined"
          color="secondary"
          value={descriptionTransfer}
          onChange={(event) => {
            setDescriptionTransfer(event.target.value);
          }}
        />

        <Button
          variant="contained"
          sx={{ alignSelf: "flex-start", marginTop: 2 }}
          onClick={handleSubmit}
        >
          Transfer Money
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

export default TransferMoney;
