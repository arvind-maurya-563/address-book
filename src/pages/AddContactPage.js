import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Box,
} from '@mui/material';

export const ContactForm = ({ open, handleClose, data }) => {
  const [formData, setFormData] = useState({
    fullName: data.fullName || '',
    dob: data.dob ? data.dob.split('T')[0] : '',
    contactNumber: data.contactNumber || '',
    email: data.email || '',
    website: data.website || '',
    groupname: data.groupname || ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear the error message for the field that is being updated
    if (errors[name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (!formData.contactNumber) {
      newErrors.contactNumber = 'Contact Number is required';
    } else if (formData.contactNumber.length !== 10) {
      newErrors.contactNumber = 'Contact Number must be exactly 10 digits';
    }
    if (!formData.email) newErrors.email = 'Email is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const Payload = { ...formData };
    if (data.id) {
      Payload.id = data.id;
    }
    handleClose(Payload);
  };

  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-modal-title"
      aria-describedby="alert-modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: "100vh",
        overflowY: "auto"

      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 'sm' }}>
        <Typography variant="h5" component="h1" gutterBottom>
          {data.id ? "Edit" : "Add"} Contact
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                name="fullName"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                error={!!errors.fullName}
                helperText={errors.fullName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="dob"
                required
                fullWidth
                id="dob"
                label="Date of Birth"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.dob}
                onChange={handleChange}
                error={!!errors.dob}
                helperText={errors.dob}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="contactNumber"
                required
                fullWidth
                id="contactNumber"
                label="Contact Number"
                value={formData.contactNumber}
                onChange={handleChange}
                error={!!errors.contactNumber}
                helperText={errors.contactNumber}
                inputProps={{ maxLength: 10 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="email"
                required
                fullWidth
                id="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="website"
                fullWidth
                id="website"
                label="Website"
                value={formData.website}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="groupname"
                fullWidth
                id="groupname"
                label="Group Name"
                value={formData.groupname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="secondary"
                onClick={()=>{handleClose()}}
              >
                Close
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                {data.id ? "Update" : "Save"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Modal>
  );
};
