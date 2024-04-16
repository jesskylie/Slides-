import Button from '@mui/material/Button';
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function NewSlideButton ({ token, presentationId, title }) {
  function getRandomInt (min = 0, max = 1000) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const navigate = useNavigate();

  const addNewSlide = async () => {
    try {
      // get data
      const response = await axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token
        }
      });
      const currStore = response.data.store.store;
      const newStore = { ...currStore }; // copy current data store to new data store
      const newSlideId = getRandomInt();
      const newSlideData = {
        slideId: newSlideId,
        text: [],
      }

      for (const index in newStore) {
        const presentationIdAsString = newStore[index].presentationId.toString();
        if (presentationIdAsString === presentationId) {
          newStore[index].slides.push(newSlideData);
        }
      }

      await axios.put('http://localhost:5005/store', { store: newStore }, {
        headers: {
          Authorization: token
        }
      });
      navigate(`/dashboard/${presentationId}/${title}/${newSlideId}`);
    } catch (error) {
      alert(error.response.data.error);
    }
  }
  return (
      <Button variant="outlined" size="small" onClick={addNewSlide} sx={{ mr: 1, mt: 1 }}>New slide</Button>
  )
}
