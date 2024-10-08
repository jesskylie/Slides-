import React, { useEffect } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const style = {
  position: 'absolute',
  bottom: 0,
  right: 0,
  textAlign: 'left',
  cursor: 'pointer'
};

/**
 * Right key takes user to next slide
 */
export default function RightKey ({ slideId, presentationId, title, token }) {
  const navigate = useNavigate();

  /**
   * Finds next slide to navigate user to next slide
   */
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
          const nextSlideIndex = currSlideIndex + 1;
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
 * Moves user to next page with right arrow key
 */
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      handleNextPage();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <ArrowForwardIcon
      onClick={handleNextPage}
      onKeyDown={handleKeyDown}
      style={style}
      alt='Image of right arrow'
    >
    </ArrowForwardIcon>
  )
}
