import { Box, Button, Grid, TextField, Typography, Paper } from "@mui/material";
import { AddMoneyToUserAccount } from "../../actions/money_action";
import { useState } from "react";

const AddMoney = () => {
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

  const [addAmount, setAddAmount] = useState("");
  const [addDescription, setAddDescription] = useState("");

  const handleSubmit = async () => {
    const data = {
      username: "Soham",
      amount: addAmount,
      description: addDescription,
      transactionType: "Debit"
    };
    const response = await AddMoneyToUserAccount(data);
    console.log(response);
    setAddAmount("");
    setAddDescription("");
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
          Add Money to Balance
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
          value={addAmount}
          onChange={(event) => {
            setAddAmount(event.target.value);
          }}
        />

        <TextField
          sx={{
            marginBottom: 2,
            width: "100%",
            borderRadius: 20,
            ...textFieldStyles,
          }}
          id="description"
          label="Description"
          variant="outlined"
          color="secondary"
          value={addDescription}
          onChange={(event) => {
            setAddDescription(event.target.value);
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
    </Grid>
  );
};

export default AddMoney;
