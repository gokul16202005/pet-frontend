import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Paws & Hearts
            </Typography>
            <Typography variant="body2">
              Making tails wag and hearts purr since 2024
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box>
              <Link
                component={RouterLink}
                to="/"
                color="inherit"
                sx={{ display: 'block', mb: 1 }}
              >
                Home
              </Link>
              <Link
                component={RouterLink}
                to="/pets"
                color="inherit"
                sx={{ display: 'block', mb: 1 }}
              >
                Available Pets
              </Link>
              <Link
                component={RouterLink}
                to="/about"
                color="inherit"
                sx={{ display: 'block', mb: 1 }}
              >
                About Us
              </Link>
              <Link
                component={RouterLink}
                to="/contact"
                color="inherit"
                sx={{ display: 'block' }}
              >
                Contact
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Connect With Us
            </Typography>
            <Box>
              <IconButton color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 4, borderTop: 1, pt: 2, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Paws & Hearts. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
