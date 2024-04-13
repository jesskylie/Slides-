import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// this left key will take back to previous page

export default function LeftKey ({ slideId, presentationId, title, token }) {
  const navigate = useNavigate();
  const handlePreviousPage = async () => {
    try {
      const response = await axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token
        }
      })
      const currStore = response.data.store.store;
      Object.keys(currStore).forEach(key => {
        if (currStore[key].presentationId.toString() === presentationId) {
          const currSlideIndex = currStore[key].slides.findIndex(slide => slide.slideId.toString() === slideId);
          if (currSlideIndex === 0) {
            navigate(`/dashboard/${presentationId}/${title}`);
          }
          console.log(currSlideIndex);
          const nextSlideIndex = currSlideIndex - 1;
          if (nextSlideIndex < currStore[key].slides.length) {
            const nextSlideId = currStore[key].slides[nextSlideIndex].slideId;
            console.log(nextSlideId);
            navigate(`/dashboard/${presentationId}/${title}/${nextSlideId}`);
          }
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ArrowBackIcon onClick={handlePreviousPage} style={{ cursor: 'pointer', paddingLeft: '50px' }}></ArrowBackIcon>
  )
}
