// Navigation Bar Component
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Stack,
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  // Get authentication state and logout function
  const { user, logout } = useAuth();

  // Navigation Links Configuration
  const navLinks = [
    { text: 'Home', path: '/' },
    { text: 'Pets', path: '/pets' },
    { text: 'About', path: '/about' },
  ];

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          {/* Logo and Brand */}
          <PetsIcon sx={{ mr: 2 }} />
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Paws & Hearts
          </Typography>

          {/* Navigation Links */}
          <Stack direction="row" spacing={2} alignItems="center">
            {navLinks.map((link) => (
              <Button
                key={link.path}
                color="inherit"
                component={RouterLink}
                to={link.path}
              >
                {link.text}
              </Button>
            ))}

            {/* Authentication Buttons */}
            {user ? (
              <>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/add-pet"
                >
                  Add Pet
                </Button>
                <Button
                  color="inherit"
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/signup"
                >
                  Sign Up
                </Button>
              </>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
