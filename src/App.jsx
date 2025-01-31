// Main App Component
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { AuthProvider, useAuth } from './context/AuthContext';

// Component imports
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import PetList from './components/PetList';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import AddPet from './components/AddPet';
import './App.css';

// Theme configuration
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

// Main App Component
function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pets" element={<PetList />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/add-pet"
                element={
                  <ProtectedRoute>
                    <AddPet />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
