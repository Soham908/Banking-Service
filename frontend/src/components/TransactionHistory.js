import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import axios from "axios";
import { UserContext } from "../App";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const { userData } = useContext(UserContext);
  const username = localStorage.getItem("userCred");
  const port = process.env.REACT_APP_BACKEND_PORT_URL
  useEffect(() => {
    if(userData.username){
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `${port}/userMoney/transaction-history/${
            username
          }`
        );
        setTransactions(response.data.transactionHistory.reverse());
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }
  }, [userData]);

    if (!username) {
      return <Typography variant="h6" color="white"  sx={{ alignContent: 'center', justifyContent:'center' }}>Please login to view your transaction history.</Typography>;
    }

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6" gutterBottom color="white">
        Transaction History
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TableContainer component={Paper} sx={{ backgroundColor: '#1e1e1e' }}>
            <Table  aria-label="transaction table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: 'white' }}>Amount</TableCell>
                  <TableCell sx={{ color: 'white' }}>Description</TableCell>
                  <TableCell sx={{ color: 'white' }}>Type</TableCell>
                  <TableCell sx={{ color: 'white' }}>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ color: 'white' }}>{transaction.amount}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{transaction.description}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{transaction.transactionType }</TableCell>
                    <TableCell sx={{ color: 'white' }}>{new Date(transaction.createdAt).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TransactionHistory;
