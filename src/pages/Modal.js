import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
};

const AlertModal = ({ open, handleClose, message }) => {
  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-modal-title"
      aria-describedby="alert-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
          Information
        </Typography>
        <Typography sx={{ mt: 2 }}>
          {message}
        </Typography>
        <Button 
          variant="contained" 
          sx={{ mt: 3, bgcolor: '#007bff' }}
          onClick={handleClose}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default AlertModal;
