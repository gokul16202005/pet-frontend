// Add Pet Form Component
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  Alert,
} from '@mui/material';
import { createPet } from '../services/api';
import { useAuth } from '../context/AuthContext';

// Form field configurations
const petTypes = [
  { value: 'dog', label: 'Dog' },
  { value: 'cat', label: 'Cat' },
  { value: 'other', label: 'Other' },
];

const formFields = {
  pet: [
    { name: 'name', label: 'Pet Name', type: 'text' },
    { name: 'type', label: 'Pet Type', type: 'select', options: petTypes },
    { name: 'breed', label: 'Breed', type: 'text' },
    { name: 'age', label: 'Age', type: 'text', placeholder: 'e.g., 2 years' },
    { name: 'description', label: 'Description', type: 'text', multiline: true, rows: 3 },
    { name: 'image', label: 'Image URL', type: 'text', placeholder: 'https://example.com/pet-image.jpg' },
  ],
  owner: [
    { name: 'owner.name', label: 'Your Name', type: 'text' },
    { name: 'owner.email', label: 'Email', type: 'email' },
    { name: 'owner.phone', label: 'Phone', type: 'tel' },
    { name: 'owner.location', label: 'Location', type: 'text' },
  ],
};

const AddPet = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Initialize form data
  const [formData, setFormData] = useState({
    name: '',
    type: 'dog',
    breed: '',
    age: '',
    description: '',
    image: '',
    owner: {
      name: '',
      email: user?.email || '',
      phone: '',
      location: ''
    }
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: '/add-pet' } });
    }
  }, [isLoggedIn, navigate]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('owner.')) {
      const [, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        owner: { ...prev.owner, [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await createPet(formData);
      setSuccess(true);
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      console.error('Error creating pet:', err);
      setError(err.message || 'Failed to add pet. Please try again.');
    }
  };

  if (!isLoggedIn) return null;

  // Render form field based on configuration
  const renderField = ({ name, label, type, ...props }) => (
    <TextField
      key={name}
      fullWidth
      name={name}
      label={label}
      value={name.includes('.') ? formData.owner[name.split('.')[1]] : formData[name]}
      onChange={handleChange}
      required
      margin="normal"
      type={type}
      {...props}
    >
      {type === 'select' && props.options?.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add a Pet
        </Typography>

        {/* Display error/success messages */}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>Pet added successfully! Redirecting...</Alert>}

        {/* Pet Information Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {/* Pet Details Section */}
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Pet Information</Typography>
          {formFields.pet.map(renderField)}

          {/* Owner Details Section */}
          <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Contact Information</Typography>
          {formFields.owner.map(renderField)}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            disabled={success}
          >
            Add Pet
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddPet;
