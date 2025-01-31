import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import GroupsIcon from '@mui/icons-material/Groups';

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ 
        position: 'relative',
        mb: 8,
        pb: 4,
        textAlign: 'center',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60px',
          height: '4px',
          backgroundColor: 'primary.main',
        }
      }}>
        <Typography variant="h3" component="h1" gutterBottom>
          About Us
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
          Where Every Pet Finds Their Forever Home
        </Typography>
      </Box>

      <Grid container spacing={6} sx={{ mb: 8 }}>
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'relative', height: '100%', minHeight: 400 }}>
            <CardMedia
              component="img"
              image="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80"
              alt="Happy adopted pet"
              sx={{ 
                height: '100%',
                objectFit: 'cover',
                borderRadius: 2,
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h4" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: 'text.secondary', mb: 3 }}>
              At Paws & Hearts, we believe every pet deserves a loving home. Our mission is to connect wonderful animals with caring families, creating lasting bonds that enrich both human and animal lives.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              We are dedicated to ensuring each adoption is a perfect match, providing support throughout the entire process and beyond. Our team of passionate animal lovers works tirelessly to maintain the highest standards of care and adoption practices.
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ mb: 8 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
            <PetsIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" gutterBottom color="primary">
              500+
            </Typography>
            <Typography variant="h6" gutterBottom>
              Successful Adoptions
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pets placed in loving forever homes
            </Typography>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
            <VolunteerActivismIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" gutterBottom color="primary">
              100%
            </Typography>
            <Typography variant="h6" gutterBottom>
              Dedication
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Commitment to animal welfare
            </Typography>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
            <GroupsIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" gutterBottom color="primary">
              10+
            </Typography>
            <Typography variant="h6" gutterBottom>
              Years Experience
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Of expert animal care
            </Typography>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Our Adoption Process
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom color="primary">
                1. Meet and Greet
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Schedule a visit to meet your potential new family member in person.
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom color="primary">
                2. Home Check
              </Typography>
              <Typography variant="body1" color="text.secondary">
                We ensure your home is ready to welcome a new pet.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom color="primary">
                3. Adoption Application
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Complete our comprehensive adoption application process.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom color="primary">
                4. Welcome Home
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Bring your new family member home with ongoing support from our team.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default About;
