import React from 'react';
import {Alert, Snackbar} from "@mui/material";

const ErrorSnackbar = ({message, open, handleClose, ...props}) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;