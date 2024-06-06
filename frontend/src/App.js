import React from 'react';
import { Box, Drawer, List, ListItem, ListItemText, Grid, Toolbar, Divider, ListItemButton, ListItemIcon, Typography, TextField, Paper } from '@mui/material';
import PaidIcon from '@mui/icons-material/Paid';
import AddMoney from './components/AddMoney';
import TransferMoney from './components/TransferMoney';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PersonIcon from '@mui/icons-material/Person';

const App = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Side Navigation */}
      <Drawer
        variant="permanent"
        sx={{
          width: '17%', // Adjust the width to be more compact
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { 
            width: '17%', 
            boxSizing: 'border-box',
            backgroundColor: '#f4f4f4', // Light background similar to YouTube
            padding: '0.5%'
          },
        }}
      >
        <Toolbar />
        <Divider />
        <List>
          {[
            { text: 'HomePage', icon: <HomeIcon /> },
            { text: 'Transaction', icon: <AccountBalanceWalletIcon /> },
            { text: 'Profile', icon: <PersonIcon /> }
          ].map((item, index) => (
            <ListItemButton 
              key={item.text} 
              sx={{ 
                padding: '8px 16px',
                '&:hover': { backgroundColor: '#e0e0e0' }, // Light gray on hover
                '&.Mui-selected': { 
                  backgroundColor: '#d0d0d0', 
                  '&:hover': { backgroundColor: '#c0c0c0' } 
                }, // Darker gray when selected
                borderRadius: 4,
                marginTop: '5%'
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={2} sx={{ height: '100%' }}>
          {/* Top Half */}
          <Grid item xs={12} sx={{ height: '50%' }}>
          <Paper
          elevation={3} // Adds a subtle shadow effect
          sx={{
            height: '100%',
            borderRadius: 8,
            padding: 4, // Adds padding inside the box
            border: "1px solid #ddd", // Light gray border
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center', // Centers content vertically
            boxSizing: 'border-box' // Ensure padding doesn't affect the overall height
          }}
        >
          <Typography
            variant="h4"
            sx={{ marginBottom: 2 }} // Space below the text
          >
            Welcome back, Soham!
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: 1 }}>
            Account Balance
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Rs. 1500
          </Typography>
        </Paper>
          </Grid>

          {/* Bottom Half */}
          <Grid item xs={12} sx={{ height: '50%' }}>
            <Grid container spacing={2} sx={{ height: '100%' }}>
              <AddMoney />
              <TransferMoney />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default App;
