import React, { useState, useEffect, useContext } from 'react';
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
import { UserContext } from '../App';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const { userData } = useContext(UserContext)
  const username = localStorage.getItem('userCred')

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await getNotificationsAction("Soham")
      setNotifications(response.notification.notificationList)
    };
    fetchNotifications();
  }, []);

  const handleNotificationAction = async ({ goalName, bankStatus, index, reserveAmount }) => {
    if(userData.balanceAmount - userData.reservedFunds - parseFloat(reserveAmount) < 1000){
      console.log("cannot be below 1000");
      return
    }
    const data = {
      username,
      goalName: goalName,
      bankStatus,
      reserveAmount
    }
    reserveFundNotificationResponse(data)

    const updatedNotifications = [...notifications];
    updatedNotifications[index].notificationStatus = bankStatus;
    setNotifications(updatedNotifications);
  }

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
            {console.log(notifications, typeof notifications)}
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
    </Container>
  );
};

export default NotificationPage;
