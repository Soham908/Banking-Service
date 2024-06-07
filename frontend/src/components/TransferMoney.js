import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";

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

  return (
    <Grid item xs={6} sx={{ height: "100%" }}>
      <Paper
        elevation={3} // This adds a shadow to the Paper component
        sx={{
          padding: 4, // Adds padding inside the card
          borderRadius: 8, // Rounds the corners
          border: "1px solid #ddd", // Light gray border
          height: "auto", // Allows the card to adjust height based on content
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          color: "white",
          backgroundColor: "#050505",
          borderColor: "#847E6A",
        }}
      >
        <Typography
          variant="h6" // Larger, bolder text for the heading
          sx={{ marginBottom: 2 }} // Adds space below the heading
        >
          Transfer Money to someone
        </Typography>
        <TextField
          sx={{
            marginBottom: 2,
            width: "100%",
            borderRadius: 20,
            ...textFieldStyles,
          }} // Full width and margin below
          id="amount"
          label="Amount"
          type="number"
          variant="outlined"
        />

        <TextField
          sx={{
            marginBottom: 2,
            width: "100%",
            borderRadius: 20,
            ...textFieldStyles,
          }} // Full width and margin below
          id="description"
          label="Recipient"
          variant="outlined"
          color="secondary"
        />

        <Button
          variant="contained" // Solid button with primary color
          sx={{ alignSelf: "flex-start", marginTop: 2 }} // Align button to the start and margin at the top
        >
          Transfer Money
        </Button>
      </Paper>
    </Grid>
  );
};

export default TransferMoney;
