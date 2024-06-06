import { Box, Button, Grid, TextField, Typography, Paper } from "@mui/material";

const AddMoney = () => {
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
        }}
      >
        <Typography
          variant="h6" // Larger, bolder text for the heading
          sx={{ marginBottom: 2 }} // Adds space below the heading
        >
          Add Money to Balance
        </Typography>
        <TextField
          sx={{ marginBottom: 2, width: "100%",borderRadius: 8, }} // Full width and margin below
          id="amount"
          label="Amount"
          type="number" 
          variant="outlined"
        />
        <TextField
          sx={{ marginBottom: 2, width: "100%",borderRadius: 20 }} // Full width and margin below
          id="description"
          label="Description"
          variant="outlined"
        />

        <Button
          variant="contained" // Solid button with primary color
          sx={{ alignSelf: "flex-start", marginTop: 2 }} // Align button to the start and margin at the top
        >
          Add Money
        </Button>
      </Paper>
    </Grid>
  );
};

export default AddMoney;
