import React, { useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const style = {
  position: 'absolute',
  bottom: 0,
  right: 30,
  textAlign: 'left',
  cursor: 'pointer'
}

/**
 * Left key will take user back to previous slide in presentation
 */
export default function LeftKey ({ slideId, presentationId, title, token }) {
  const navigate = useNavigate();

  /**
 * Finds previous slide to navigate user back to previous slide
 */
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
          const nextSlideIndex = currSlideIndex - 1;
          if (nextSlideIndex < currStore[key].slides.length) {
            const nextSlideId = currStore[key].slides[nextSlideIndex].slideId;
            navigate(`/dashboard/${presentationId}/${title}/${nextSlideId}`);
          }
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  /**
 * Moves user to previous page with left arrow key
 */
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      handlePreviousPage();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <ArrowBackIcon
      onKeyDown={handleKeyDown}
      onClick={handlePreviousPage}
      style={style}
      alt='Image of left arrow'
    >
    </ArrowBackIcon>
  )
}
