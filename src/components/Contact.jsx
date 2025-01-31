import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Alert,
  Card,
  CardContent,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // Replace these with your EmailJS service details
      const result = await emailjs.send(
        'YOUR_SERVICE_ID', // Service ID from EmailJS
        'YOUR_TEMPLATE_ID', // Template ID from EmailJS
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message,
          to_email: 'gokul.c2021@gmail.com',
        },
        'YOUR_PUBLIC_KEY' // Public Key from EmailJS
      );

      if (result.status === 200) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      setError('Failed to send message. Please try again later.');
      console.error('Email sending failed:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ 
        textAlign: 'center',
        mb: 8,
        position: 'relative',
        pb: 4,
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
          Contact Us
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
          We'd Love to Hear From You
        </Typography>
      </Box>

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
              Send us a message
            </Typography>
            
            {submitted && (
              <Alert severity="success" sx={{ mb: 3 }}>
                Thank you for your message! We'll get back to you soon.
              </Alert>
            )}

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Message"
                name="message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                margin="normal"
                variant="outlined"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 3, py: 1.5, px: 4 }}
              >
                Send Message
              </Button>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Visit Our Shelter
                  </Typography>
                  <Box 
                    sx={{ 
                      width: '100%',
                      height: 200,
                      bgcolor: 'grey.200',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Map placeholder - In a real app, integrate Google Maps here
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationOnIcon sx={{ color: 'primary.main', mr: 2, fontSize: 30 }} />
                    <Typography variant="h6">Address</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    123 Pet Street
                    <br />
                    Anytown, ST 12345
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AccessTimeIcon sx={{ color: 'primary.main', mr: 2, fontSize: 30 }} />
                    <Typography variant="h6">Hours</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Mon - Fri: 9:00 AM - 6:00 PM
                    <br />
                    Sat - Sun: 10:00 AM - 4:00 PM
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PhoneIcon sx={{ color: 'primary.main', mr: 2, fontSize: 30 }} />
                    <Typography variant="h6">Phone</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Main: (555) 123-4567
                    <br />
                    Emergency: (555) 987-6543
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <EmailIcon sx={{ color: 'primary.main', mr: 2, fontSize: 30 }} />
                    <Typography variant="h6">Email</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    info@pawsandhearts.com
                    <br />
                    support@pawsandhearts.com
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;