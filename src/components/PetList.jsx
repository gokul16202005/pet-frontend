import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { getAllPets, deletePet } from '../services/api';

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  const [ownerDialog, setOwnerDialog] = useState(false);
  const [loginDialog, setLoginDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  const fetchPets = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllPets();
      setPets(data);
    } catch (err) {
      console.error('Error fetching pets:', err);
      setError('Failed to load pets. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleMeet = (pet) => {
    if (!isLoggedIn) {
      setLoginDialog(true);
    } else {
      setSelectedPet(pet);
      setOwnerDialog(true);
    }
  };

  const handleLoginRedirect = () => {
    setLoginDialog(false);
    navigate('/login');
  };

  const handleDeleteClick = (pet) => {
    setSelectedPet(pet);
    setDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deletePet(selectedPet._id);
      setDeleteDialog(false);
      setSelectedPet(null);
      fetchPets(); // Refresh the pet list
    } catch (err) {
      console.error('Error deleting pet:', err);
      setError('Failed to delete pet. Please try again later.');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Available Pets
        </Typography>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Available Pets
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {pets.map((pet) => (
          <Grid item xs={12} sm={6} md={4} key={pet._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={pet.image}
                alt={pet.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {pet.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {pet.breed} • {pet.age}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {pet.description}
                </Typography>
                <Box sx={{ mt: 'auto', display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleMeet(pet)}
                    fullWidth
                    sx={{ textTransform: 'none' }}
                  >
                    Meet {pet.name}
                  </Button>
                  {isLoggedIn && user && pet.addedBy && pet.addedBy.email === user.email && (
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(pet)}
                      title="Delete pet"
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Login Dialog */}
      <Dialog open={loginDialog} onClose={() => setLoginDialog(false)}>
        <DialogTitle>Login Required</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please log in to see the contact information for this pet's owner.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLoginDialog(false)}>Cancel</Button>
          <Button onClick={handleLoginRedirect} variant="contained" color="primary">
            Log In
          </Button>
        </DialogActions>
      </Dialog>

      {/* Owner Contact Dialog */}
      <Dialog open={ownerDialog} onClose={() => setOwnerDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Contact Information</DialogTitle>
        <DialogContent>
          {selectedPet && (
            <List>
              <ListItem>
                <ListItemText primary={selectedPet.owner.name} secondary="Owner Name" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EmailIcon fontSize="small" />
                      {selectedPet.owner.email}
                    </Box>
                  }
                  secondary="Email"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PhoneIcon fontSize="small" />
                      {selectedPet.owner.phone}
                    </Box>
                  }
                  secondary="Phone"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationIcon fontSize="small" />
                      {selectedPet.owner.location}
                    </Box>
                  }
                  secondary="Location"
                />
              </ListItem>
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOwnerDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove {selectedPet?.name} from the adoption list?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PetList;
