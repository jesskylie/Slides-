import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import LogoutButton from '../components/LogoutButton';

/**
 * Navigation bar that allows user to login, logout or register
 */
export default function NavBar ({ token, setToken }) {
  const location = useLocation();
  return (
    <Box sx={{ flexGrow: 1, marginBottom: '20px' }}>
      <AppBar position="static">
        <Toolbar>
            <SlideshowIcon alt='Logo of Slides'></SlideshowIcon>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Slides
          </Typography>
          {location.pathname === '/dashboard'
            ? (<LogoutButton token={token} setToken={setToken}></LogoutButton>)
            : location.pathname === '/' && (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register" >Register</Button>
          </>
            )
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
