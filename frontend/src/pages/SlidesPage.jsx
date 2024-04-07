import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import EditTitleModal from '../components/EditTitleModal'
import { useParams } from 'react-router-dom';
import LeftKey from '../components/LeftKey';
import RightKey from '../components/RightKey';
import axios from 'axios';
import DeleteSlidePrompt from '../components/DeleteSlidePrompt';

export default function SlidesPage ({ token, setTokenFunction }) {
  const { presentationId, title, slideId } = useParams();
  const [lastPage, setLastPage] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const handleRightKey = async () => {
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
          if (currSlideIndex === currStore[key].slides.length - 1) {
            setLastPage(true);
          }
          console.log(currSlideIndex)
          setPageNumber(currSlideIndex + 1);
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleRightKey();
    console.log(lastPage);
  }, [slideId])

  // render current slide
  return (
        <>
         <NavBar/>
        <h1 style={{ textAlign: 'center' }}>{title}<EditTitleModal token={token} presentationId={presentationId}/></h1>
        <div style={{ position: 'relative' }}>
             <Card variant="outlined" sx={{ minWidth: 275, minHeight: 500 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Slide: {slideId}
                </Typography>
                <div style={{ position: 'absolute', left: '10px', bottom: '70px' }}>
              {pageNumber}
           </div>
            </CardContent>
        </Card>
        <DeleteSlidePrompt token={token} slideId={slideId} presentationId={presentationId} ></DeleteSlidePrompt>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
           <LeftKey slideId={slideId} presentationId={presentationId} title={title} token={token}></LeftKey>
           <RightKey slideId={slideId} presentationId={presentationId} title={title} token={token}></RightKey>

        </div>
        </div>

        </>
  )
}
