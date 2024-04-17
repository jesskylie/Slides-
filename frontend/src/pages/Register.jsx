import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Button from '@mui/material/Button';

/**
 * Takes user to register page
 */
export default function Register ({ token, setTokenFunction }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('')
  const navigate = useNavigate();

  if (token !== null) {
    return <Navigate to="/dashboard"/>
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
    setError('');
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
    setError('');
  }

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
    setError('');
  }

  const handleName = (e) => {
    setName(e.target.value)
    setError('');
  }

  const register = async () => {
    try {
      if (confirmPassword !== password) {
        setError('Passwords do not match');
        return;
      }
      const response = await axios.post('http://localhost:5005/admin/auth/register', {
        email,
        password,
        name
      });
      setTokenFunction(response.data.token);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response.data.error);
    }
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    register();
  }

  return (
      <>
        <NavBar token={token} setToken={setTokenFunction}></NavBar>
        <form onSubmit={handleRegisterSubmit}>
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
          </label>
          <label style={{ fontFamily: 'Arial, sans-serif' }}>
            Confirm Password:
            <input
              type="text"
              onChange={handleConfirmPassword}
              value={confirmPassword}
              style={{ margin: '2px' }}/><br />
          </label>
          <label
            style={{ fontFamily: 'Arial, sans-serif' }}>
            Name:
            <input
              type="text"
              onChange={handleName}
              value={name}
              style={{ margin: '2px' }}/><br />
          </label>
          <Button
            type="submit"
            variant="contained"
            size="small">
            Register
          </Button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </>
  )
}
