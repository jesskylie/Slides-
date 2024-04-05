import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function LogoutButton ({ token, setToken }) {
  const logout = async () => {
    try {
      await axios.post('http://localhost:5005/admin/auth/logout', {}, {
        headers: {
          Authorization: token
        }
      })
      setToken(null);
      console.log('Logged out successfully');
      localStorage.removeItem('token');
    } catch (error) {
      alert(error.response.data.error);
    }
  }
  return (
    <Button
      sx={{
        color: 'inherit',
        textDecoration: 'none', // Ensure no underline on hover
        '&:hover': {
          textDecoration: 'none' // Ensure no underline on hover
        }
      }}
      component={Link}
      to="/login"
      onClick={logout}
    >
      Logout
    </Button>
  );
}
