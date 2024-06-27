import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { getNotificationsAction, reserveFundNotificationResponse } from '../actions/notificationAction';
import SlideSnackbar from '../components/SlideSnackbar';
import { useUserDataStore } from '../store/store';
import { checkAccountBalanceAction } from '../actions/moneyAction';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  
  const { username, balanceAmount, reservedFunds } = useUserDataStore(state => state.userData)
  const setUserDataToStore = useUserDataStore(state => state.setStoreUserData)

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Request Accepted")

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await getNotificationsAction(username)
      if(response)
        setNotifications( response?.notification?.notificationList?.reverse() )
    };
    fetchNotifications();
  }, []);

  const updateBalanceAndReserved = async () => {
    const response = await checkAccountBalanceAction(username);
      const data = {
        username: username,
        balanceAmount: response?.balanceAmount,
        reservedFunds: response?.reservedFunds,
      };
      setUserDataToStore(data);
  }

  const handleNotificationAction = async ({ goalName, bankStatus, index, reserveAmount }) => {
    if(balanceAmount - reservedFunds - parseFloat(reserveAmount) < 1000){
      console.log("cannot be below 1000");
      setSnackbarOpen(true)
      setSnackbarMessage("Reserved amount cannot go above minimum 1000 account balance")
      return
    }
    const data = {
      username,
      goalName: goalName,
      bankStatus,
      reserveAmount
    }
    await reserveFundNotificationResponse(data)
    updateBalanceAndReserved()

    const updatedNotifications = [...notifications];
    updatedNotifications[index].notificationStatus = bankStatus;
    setNotifications(updatedNotifications);
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container>
      <Typography variant="h4" color='white' fontWeight='bold' gutterBottom>
        Notifications
      </Typography>
      <TableContainer component={Paper} sx={{ backgroundColor: '#1e1e1e', maxWidth:'100vw' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell  sx={{ color: 'white' }} >Content</TableCell>
              <TableCell  sx={{ color: 'white' }} >Amount</TableCell>
              <TableCell  sx={{ color: 'white' }} >Status</TableCell>
              <TableCell  sx={{ color: 'white' }} >From App</TableCell>
              <TableCell  sx={{ color: 'white' }} >Type</TableCell>
              <TableCell  sx={{ color: 'white' }} >Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications?.map((notification, index) => (
              <TableRow key={index}>
                <TableCell  sx={{ color: 'white' }} >{notification.notificationContent}</TableCell>
                <TableCell  sx={{ color: 'white' }} >{notification.notificationAmount}</TableCell>
                <TableCell  sx={{ color: 'white' }} >{notification.notificationStatus}</TableCell>
                <TableCell  sx={{ color: 'white', display: { xs: 'none', sm: 'table-cell' } }} >{notification.notificationContentFromApp}</TableCell>
                <TableCell  sx={{ color: 'white' }} >{notification.notificationType}</TableCell>
                {
                  notification.notificationStatus === 'pending' ?
                <TableCell>
                  <IconButton color="primary" onClick={() => handleNotificationAction({goalName: notification.notificationContent, bankStatus: "verified", index, reserveAmount: notification.notificationAmount}) }>
                    <CheckIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleNotificationAction({goalName: notification.notificationContent, bankStatus: "rejected", index}) }>
                    <CloseIcon />
                  </IconButton>
                </TableCell>
                :
                <TableCell sx={{ color: 'white' }}>
                  Completed
                </TableCell>
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <SlideSnackbar
          open={snackbarOpen}
          message={snackbarMessage}
          handleClose={handleCloseSnackbar}
          autoHideDuration={3000}
        />
    </Container>
  );
};

export default NotificationPage;
