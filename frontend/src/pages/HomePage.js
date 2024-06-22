import MainBoard from "../components/homepage/MainBoard";
import React from 'react';
import { Grid } from '@mui/material';
import AddMoney from '../components/homepage/AddMoney';
import TransferMoney from '../components/homepage/TransferMoney';


const HomePage = () => {
  return (
    <Grid container spacing={2} sx={{ height: "100%" }}>

      <Grid container item xs={12} spacing={2}>

        <Grid item xs={12} sx={{ height: "50vh" }}>
          <MainBoard />
        </Grid>

      </Grid>

      <Grid container spacing={2} item xs={12}>
        
        <Grid item xs={12} sm={6} md={6} sx={{ height: '45vh' }}>
          <AddMoney />
        </Grid>

        <Grid item xs={12} sm={6} md={6} sx={{ height: '45vh' }}>
          <TransferMoney />
        </Grid>

        </Grid>
    </Grid>
  );
};

export default HomePage;
