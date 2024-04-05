import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar'

export default function Register ({ token, setTokenFunction }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  if (token !== null) {
    return <Navigate to="/dashboard"/>
  }

  const register = async () => {
    try {
      if (confirmPassword !== password) {
        alert('Passwords do not match');
        return;
      }
      const response = await axios.post('http://localhost:5005/admin/auth/register', {
        email,
        password,
        name
      });
      setTokenFunction(response.data);
      navigate('/dashboard');
    } catch (error) {
      console.log(error.response.data.error);
    }
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    register();
  }

  return (
      <>
        <NavBar></NavBar>
        <form onSubmit={handleRegisterSubmit}>
          <label>
             Email:
             <input type="text" onChange={e => setEmail(e.target.value)} value={email} /><br />
          </label>
          <label>
            Password:
            <input type="text" onChange={e => setPassword(e.target.value)} value={password}/><br />
          </label>
          <label>
            Confirm Password: <input type="text" onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword}/><br />
          </label>
          <label>
            Name: <input type="text" onChange={e => setName(e.target.value)} value={name}/><br />
          </label>
            <button onClick={register}>Register</button>
        </form>

      </>
  )
}
