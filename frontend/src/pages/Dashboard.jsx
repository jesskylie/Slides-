import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar'
import NewPresentationButton from '../components/NewPresentationButton';
import PresentationCard from '../components/PresentationCard';

/**
 * Dashboard page that user sees when logged in
 */
export default function Dashboard ({ token, setTokenFunction }) {
  const [store, setStore] = useState({})
  const [presentation, setPresentation] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5005/store', {
      headers: {
        Authorization: token
      }
    }).then((response) => {
      setStore(response.data.store.store);
    })
  }, [])

  useEffect(() => {
    if (store && Object.keys(store).length !== 0) {
      const presentationsArray = Object.values(store);
      setPresentation(presentationsArray);
    }
  }, [store])

  if (token === null) {
    return <Navigate to="/login"/>
  }

  return <>
        <NavBar token={token} setToken={setTokenFunction}></NavBar>
        <h1>Dashboard</h1>
        <NewPresentationButton token={token} setToken={setTokenFunction}></NewPresentationButton>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {presentation.map(presentations => (
            <PresentationCard
              key={presentations.presentationId}
              presentationId = {presentations.presentationId}
              title={presentations.title}
              description={presentations.description}
              numSlides={presentations.slides.length}
              slideId={presentations.slides[0].slideId}
            />
          ))
          }
        </div>
    </>
}
