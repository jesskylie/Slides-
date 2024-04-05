import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';

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
      console.log(response);
      console.log(response.data);
      console.log(response.data.token);
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
     <NavBar ></NavBar>
     <form onSubmit={handleFormSubmit}>
      <label>
        Email:
        <input type="text" onChange={e => setEmail(e.target.value)} value={email} /><br />
      </label>
      <label>
        Password: <input type="text" onChange={e => setPassword(e.target.value)} value={password}/><br />
      </label>
        <button type="submit">Login</button>
     </form>
    </>
  )
}
