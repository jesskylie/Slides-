import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

/*
 * Logs user out of slides application
*/
export default function LogoutButton ({ token, setToken }) {
  const logout = async () => {
    try {
      await axios.post('http://localhost:5005/admin/auth/logout', {}, {
        headers: {
          Authorization: token
        }
      })
      setToken(null);
      localStorage.removeItem('token');
    } catch (error) {
      alert(error.response.data.error);
    }
  }
  return (
    <Button
      sx={{
        color: 'inherit',
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'none'
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
