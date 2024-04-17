import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Button from '@mui/material/Button';

/**
 * Login page when user clicks login
 */
export default function Login ({ token, setTokenFunction }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('')

  if (token !== null) {
    return <Navigate to="/dashboard"/>
  }
  /**
   * Calls post request to backend when user logs in
   */
  const login = async () => {
    try {
      const response = await axios.post('http://localhost:5005/admin/auth/login', {
        email,
        password,
      });
      setTokenFunction(response.data.token);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response.data.error);
    }
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
    setError('');
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
    setError('');
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    login();
  }

  return (
    <>
     <NavBar token={token}></NavBar>
     <form onSubmit={handleFormSubmit}>
      <label style={{ fontFamily: 'Arial, sans-serif' }}>
        Email:
        <input
          type="text"
          onChange={handleEmail}
          value={email}
          style={{ margin: '2px' }}/><br />
      </label>
      <label style={{ fontFamily: 'Arial, sans-serif' }}>
        Password:
        <input
          type="text"
          onChange={handlePassword}
          value={password}
          style={{ margin: '2px' }}/><br />
      </label >
        <Button
          type="submit"
          variant="contained"
          size="small">
          Login
        </Button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
     </form>
    </>
  )
}
