import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { TransferMoneyFromAccount } from "../../actions/money_action";
import { TextFieldStyle } from "../../constants/Constants";
import { UserContext } from "../../App";
import SlideSnackbar from "../SlideSnackbar";


const UserInput = ({ snackMessage, TransactionFunc, title, label }) => {
    const [amount, setamount] = useState("");
    const [description, setDescription] = useState("");
    const { userData, setUserData } = useContext(UserContext);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
  
    const [snackbarMessage, setSnackbarMessage] = useState(
      snackMessage
    );
  
    const [disableButton, setDisableButton] = useState(false)
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('');
  
  
    const handleSubmit = async () => {
      if(error){
        setSnackbarOpen(true)
        setSnackbarMessage(helperText)
      }else{
      setDisableButton(true)
      if (userData.username) {
        if (amount && description) {
          const data = {
            username: userData.username,
            amount: amount,
            description: description,
          };
  
          const response = await TransactionFunc(data);
  
  
          const state = {
            username: userData.username,
            balanceAmount: response.balanceAmount,
          };
          setUserData(state);
          setamount("");
          setDescription("");
          setSnackbarOpen(true);
          setSnackbarMessage(snackMessage)
        }
      } else {
        setSnackbarMessage("Please Login to use this");
        setSnackbarOpen(true);
        setamount("");
        setDescription("");
      }
      setDisableButton(false)
    }
    };
  
    const handleCloseSnackbar = () => {
      setSnackbarOpen(false);
    };
  
    const handleAmountChange = (event) => {
      const value = event.target.value;
      setamount(value);
      if (userData.username) {
        if(value){
          if (value < 0) {
            setError(true);
            setHelperText('Amount should be greater than 0');
          } else if (!/^\d+(\.\d{0,2})?$/.test(value)) {
            setError(true);
            setHelperText('Enter a valid amount with up to 2 decimal places');
          } else {
            setError(false);
            setHelperText('');
          }
        }else {
          setError(false); 
          setHelperText('');
        }
      }
    };
  
    return (
      <>
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
  
            {title}
  
  
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
            value={amount}
            onChange={handleAmountChange}
            error={error}
            helperText={helperText}
            inputProps={{ min: 0 }}
            required
          />
  
          <TextField
            sx={{
              marginBottom: 2,
              width: "100%",
              borderRadius: 20,
              ...TextFieldStyle,
            }}
            id="description"
  
            label={label}
  
  
            variant="outlined"
            color="secondary"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
  
          <Button
            variant="contained"
            sx={{ alignSelf: "flex-start", marginTop: 2 }}
            onClick={handleSubmit}
            disabled={disableButton}
          >
  
            {title}
  
            
          </Button>
        </Paper>
  
        <SlideSnackbar
          open={snackbarOpen}
          message={snackbarMessage}
          handleClose={handleCloseSnackbar}
        />
        </>
    );
}

export default UserInput