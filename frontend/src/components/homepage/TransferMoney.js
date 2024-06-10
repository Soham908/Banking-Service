import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { TransferMoneyFromAccount } from "../../actions/money_action";

const TransferMoney = () => {
  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#FFFFFF3A",
      },
      "&:hover fieldset": {
        borderColor: "lightgray",
      },
      "&.Mui-focused fieldset": {
        borderColor: "lightgray",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#FFFFFFAA",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "lightgray",
    },
    "& input": {
      color: "white",
    },
  };

  const [amountTransfer, setAmountTransfer] = useState("")
  const [descriptionTransfer, setDescriptionTransfer] = useState("")

  const handleSubmit = async () => {
    const data = {
      username: "Soham",
      amount: parseInt(amountTransfer) * -1,
      description: descriptionTransfer,
      transactionType: "Credit"
    }
    const transfer = await TransferMoneyFromAccount(data)
    console.log(transfer);
  }

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
        <Typography
          variant="h6" 
          sx={{ marginBottom: 2 }}
        >
          Transfer Money to someone
        </Typography>
        <TextField
          sx={{
            marginBottom: 2,
            width: "100%",
            borderRadius: 20,
            ...textFieldStyles,
          }} 
          id="amount"
          label="Amount"
          type="number"
          variant="outlined"
          value={amountTransfer}
          onChange={(event) => {setAmountTransfer(event.target.value)}}
        />

        <TextField
          sx={{
            marginBottom: 2,
            width: "100%",
            borderRadius: 20,
            ...textFieldStyles,
          }} 
          id="description"
          label="Recipient"
          variant="outlined"
          color="secondary"
          value={descriptionTransfer}
          onChange={(event) => {setDescriptionTransfer(event.target.value)}}
        />

        <Button
          variant="contained"
          sx={{ alignSelf: "flex-start", marginTop: 2 }}
          onClick={handleSubmit}
        >
          Transfer Money
        </Button>
      </Paper>
    </Grid>
  );
};

export default TransferMoney;
