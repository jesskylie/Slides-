import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Button from '@mui/material/Button';

export default function Login ({ token, setTokenFunction }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  if (token !== null) {
    return <Navigate to="/dashboard"/>
  }

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:5005/admin/auth/login', {
        email,
        password,
      });
      setTokenFunction(response.data.token);
      navigate('/dashboard');
    } catch (error) {
      alert(error.response.data.error);
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    login();
  }

  return (
    <>
     <NavBar token={token}></NavBar>
     <form onSubmit={handleFormSubmit}>
      <label>
        Email:
        <input type="text" onChange={e => setEmail(e.target.value)} value={email} /><br />
      </label>
      <label>
        Password: <input type="text" onChange={e => setPassword(e.target.value)} value={password}/><br />
      </label>
        <Button type="submit" variant="contained" size="small">Login</Button>
     </form>
    </>
  )
}
