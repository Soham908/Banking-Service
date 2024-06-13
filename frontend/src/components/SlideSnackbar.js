import React from 'react';
import { Snackbar, Slide } from '@mui/material';

const SlideTransition = (props) => {
  return <Slide {...props} direction="down" />;
};

const SlideSnackbar = ({ open, message, handleClose, autoHideDuration = 2000 }) => {
  return (
    <Snackbar
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
      message={message}
      autoHideDuration={autoHideDuration}
    />
  );
};

export default SlideSnackbar;
