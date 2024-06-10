import React from 'react';
import { Grid, Typography, Paper } from '@mui/material';


const MainBoard = () => {
    return(
        <Grid item xs={12} sx={{ height: "50%" }}>
            <Paper
              elevation={3}
              sx={{
                height: "100%",
                borderRadius: 8,
                padding: 4,
                border: "1px solid #ddd",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                boxSizing: "border-box",
                color: "white",
                backgroundColor: "#050505",
                borderColor: "#847E6A",
              }}
            >
              <Typography variant="h4" sx={{ marginBottom: 2 }}>
                Welcome back, Soham!
              </Typography>
              <Typography variant="h6" sx={{ marginBottom: 1 }}>
                Account Balance
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Rs. 1500
              </Typography>
            </Paper>
          </Grid>
    )
}

export default MainBoard