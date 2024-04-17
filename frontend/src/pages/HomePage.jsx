import React from 'react';
import NavBar from '../components/NavBar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const style = {
  fontFamily: 'Arial, sans-serif',
  fontSize: '4em',
  marginTop: '40px',
  textAlign: 'center',
  color: '#666'
};

/**
 * Home page when user loads page
 */
export default function HomePage () {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/register');
  }
  return (
    <div style={{ textAlign: 'center' }}>
      <NavBar />
        <h1 style={{ style }}>Make better Presentations</h1>
        <p style={{ style }}>Create exceptional slide decks in half the time using intuitive design tools and machine learning. Present remotely or on-site.</p>
        <Button variant="contained" size="small" onClick={handleClick}>Start presenting</Button>
      </div>
  );
}
