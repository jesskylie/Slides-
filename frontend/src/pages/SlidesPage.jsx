import React, { useState } from 'react';
import NavBar from '../components/NavBar'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import EditTitleModal from '../components/EditTitleModal'
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function SlidesPage ({ token, setTokenFunction }) {
  const { presentationId, title, slideId } = useParams();
  const [slideCount, setSlideCount] = useState(1); // Initial slide count

  const numSlides = async () => {
    try {
      // get old store
      const response = await axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token
        }
      });
      console.log(response);
      const currStore = response.data.store.store;
      Object.keys(currStore).forEach(key => {
        if (currStore[key].presentationId.toString() === presentationId) {
          const slidePage = key.slides.findIndex(slide => slide.slideId.toString() === slideId);
          setSlideCount(slidePage + 1);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  numSlides();

  // render current slide
  return (
        <>
         <NavBar/>
        <h1 style={{ textAlign: 'center' }}>{title}<EditTitleModal token={token} presentationId={presentationId}/></h1>

        <Card variant="outlined" sx={{ minWidth: 275, minHeight: 500 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Slide: {slideId}
                </Typography>
                <Typography variant="body1" component="div" style={{ textAlign: 'center' }}>
            Slide Count: {slideCount}
      </Typography>
            </CardContent>
        </Card>
        </>
  )
}
