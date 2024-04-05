import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';
import axios from 'axios';
import NavBar from '../components/NavBar'
import NewPresentationButton from '../components/NewPresentationButton';
import PresentationCard from '../components/Card';

export default function Dashboard ({ token, setTokenFunction }) {
  const [store, setStore] = useState({})
  // executes this code every time something in this state changes
  useEffect(() => {
    axios.get('http://localhost:5005/store', {
      headers: {
        Authorization: token
      }
    }).then((response) => {
      setStore(response.data.store);
    });
  }, [])
  // Ensure that store.store exists before accessing its properties
  const title = store.store ? store.store.title || '' : '';
  const description = store.store ? store.store.description || '' : '';
  const presentationId = store.store ? store.store.presentationId || '' : '';
  // no valid token will redirect to register page
  if (token === null) {
    return <Navigate to="/login"/>
  }
  console.log(store);
  // else change to dashboard
  return <>
        <NavBar ></NavBar>
        <LogoutButton token={token} setToken={setTokenFunction}/><br></br>
        <h1>Dashboard</h1>
        <NewPresentationButton token={token} setToken={setTokenFunction}></NewPresentationButton>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div>
        {title && <PresentationCard presentationId={presentationId} title={title} description={description} />}
        </div>
      </div>
    </>
}
