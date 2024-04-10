import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import SlidesPage from './pages/SlidesPage'

function App () {
  let lsToken = null;
  if (localStorage.getItem('token')) {
    lsToken = localStorage.getItem('token');
  }

  const [token, setToken] = useState(lsToken);
  const setTokenAbstract = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  }

  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomePage/>} />
        <Route path="/dashboard" element={<Dashboard token={token} setTokenFunction={setTokenAbstract}/>} />
        <Route path="/dashboard/:presentationId/:title" element={<SlidesPage token={token} setTokenFunction={setTokenAbstract}/>}/>
        <Route path="/dashboard/:presentationId/" element={<SlidesPage token={token} setTokenFunction={setTokenAbstract}/>}/>
        <Route path="/dashboard/:presentationId/:title/:slideId" element={<SlidesPage token={token} setTokenFunction={setTokenAbstract}/>}/>
          <Route path="/register" element={<Register token={token} setTokenFunction={setTokenAbstract}/>} />
          <Route path="/login" element={<Login token={token} setTokenFunction={setTokenAbstract}/>} />
      </Routes>
    </BrowserRouter>
    </>

  );
}

export default App;
