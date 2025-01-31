import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';

const categoryImages = {
  dogs: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=800&q=80',
  cats: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80',
  others: 'https://images.unsplash.com/photo-1583301286816-f4f05e1e8b25?auto=format&fit=crop&w=800&q=80'
};

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '70vh',
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.7)',
            zIndex: -1,
          },
        }}
      >
        <Container maxWidth="md" sx={{ color: 'white', textAlign: 'center', position: 'relative' }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{
              fontWeight: 700,
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            Find Your Perfect Companion
          </Typography>
          <Typography 
            variant="h5" 
            paragraph
            sx={{
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              mb: 4,
            }}
          >
            Give a loving home to a pet in need
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={RouterLink}
            to="/pets"
            sx={{
              py: 2,
              px: 4,
              fontSize: '1.2rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}
          >
            Adopt Now
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
          Meet Our Pets
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', transition: '0.3s', '&:hover': { transform: 'translateY(-8px)' } }}>
              <CardMedia
                component="img"
                height="300"
                image={categoryImages.dogs}
                alt="Dogs"
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Dogs
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Find loyal companions ready to join your family
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', transition: '0.3s', '&:hover': { transform: 'translateY(-8px)' } }}>
              <CardMedia
                component="img"
                height="300"
                image={categoryImages.cats}
                alt="Cats"
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Cats
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Discover adorable felines looking for forever homes
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', transition: '0.3s', '&:hover': { transform: 'translateY(-8px)' } }}>
              <CardMedia
                component="img"
                height="300"
                image={categoryImages.others}
                alt="Other Pets"
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Other Pets
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Browse our selection of unique and lovable pets
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* New section for adding pets */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Have a Pet for Adoption?
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            If you have a pet that needs a loving home, you can list them for adoption on our platform.
            We'll help you find the perfect family for your furry friend.
          </Typography>
          <Button
            component={RouterLink}
            to="/add-pet"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2 }}
          >
            Add Your Pet
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
