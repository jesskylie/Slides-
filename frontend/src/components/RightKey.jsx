import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// this right key will take back to previous page

export default function RightKey ({ slideId, presentationId, title, token }) {
  const navigate = useNavigate();
  const handleNextPage = async () => {
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
          console.log(currSlideIndex);
          const nextSlideIndex = currSlideIndex + 1;
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

  const style = {
    position: 'absolute',
    bottom: 0,
    right: 0,
    textAlign: 'left',
    cursor: 'pointer'
  };

  return (
    <ArrowForwardIcon onClick={handleNextPage} style={style}></ArrowForwardIcon>
  )
}
