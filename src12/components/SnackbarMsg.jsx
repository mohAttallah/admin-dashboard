import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export const Severity = Object.freeze({
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
});

export const AnchorOrigin = Object.freeze({
  TOP_LEFT: { vertical: 'top', horizontal: 'left' },
  TOP_CENTER: { vertical: 'top', horizontal: 'center' },
  TOP_RIGHT: { vertical: 'top', horizontal: 'right' },
  BOTTOM_LEFT: { vertical: 'bottom', horizontal: 'left' },
  BOTTOM_CENTER: { vertical: 'bottom', horizontal: 'center' },
  BOTTOM_RIGHT: { vertical: 'bottom', horizontal: 'right' },
});

const CustomSnackbar = ({ text, severity, anchorOrigin }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {text}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomSnackbar;