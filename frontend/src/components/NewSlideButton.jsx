import Button from '@mui/material/Button';
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getRandomInt } from '../helper';

/**
 * Creates a new slide
 */
export default function NewSlideButton ({ token, presentationId, title }) {
  const navigate = useNavigate();
  /**
   * Saves new slide to database
   */
  const addNewSlide = async () => {
    try {
      const response = await axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token
        }
      });
      const currStore = response.data.store.store;
      const newStore = { ...currStore };
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
    <Button
      variant="outlined"
      size="small"
      onClick={addNewSlide}
      sx={{ mr: 1, mt: 1 }}>
      New slide
    </Button>
  )
}
