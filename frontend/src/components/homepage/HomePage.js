import MainBoard from "./MainBoard";
import React from 'react';
import { Grid } from '@mui/material';
import AddMoney from './AddMoney';
import TransferMoney from './TransferMoney';


const HomePage = () => {
  return (
    <Grid container spacing={2} sx={{ height: "100%" }}>

      <MainBoard />

      <Grid item xs={12} sx={{ height: "50%" }}>
        <Grid container spacing={2} sx={{ height: "100%" }}>

          <AddMoney />
          <TransferMoney />

        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomePage;
