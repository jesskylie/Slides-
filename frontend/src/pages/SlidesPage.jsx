import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import EditTitleModal from '../components/EditTitleModal'
import { useNavigate, useParams } from 'react-router-dom';
import LeftKey from '../components/LeftKey';
import RightKey from '../components/RightKey';
import axios from 'axios';
import DeleteSlidePrompt from '../components/DeleteSlidePrompt';
import EditSideBar from '../components/EditSideBar';
import DeletePresentationPrompt from '../components/DeletePresentationPrompt'
import Button from '@mui/material/Button';
import NewSlideButton from '../components/NewSlideButton';
import TextBox from '../components/TextBox';

export default function SlidesPage ({ token, setTokenFunction }) {
  const { presentationId, title, slideId } = useParams();
  const [lastPage, setLastPage] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [confirmClicked, setConfirmClicked] = useState(false);
  const [text, setText] = useState('');
  const [colour, setColour] = useState('');
  const [fontSize, setFontSize] = useState('');

  const navigate = useNavigate();

  const gotoDashboard = () => {
    navigate('/dashboard');
  }

  const handleConfirmClick = () => {
    setConfirmClicked(true);
  };

  useEffect(() => {
    const getText = async () => {
      const response = await axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token
        }
      })
      const currStore = response.data.store.store;
      for (const index in currStore) {
        if (currStore[index].presentationId.toString() === presentationId) {
          const slideIndex = currStore[index].slides.findIndex(slide => slide.slideId.toString() === slideId);
          if (slideIndex !== -1) {
            setText(currStore[index].slides[slideIndex].text[0].text)
            setFontSize(currStore[index].slides[slideIndex].text[0].fontSize)
            setColour(currStore[index].slides[slideIndex].text[0].textColour)
          }
        }
      }
    }

    if (confirmClicked) {
      getText();
      // Reset confirmClicked state
      setConfirmClicked(false);
    }
  }, [confirmClicked]);

  const onDelete = (event) => {
    if (event) {
      event.preventDefault(); // Prevent the default context menu from appearing
      // go delete the text
    }

    // Perform deletion logic here, such as removing the element from state
    // or making an API request to delete the element from the server
    console.log('Element deleted');
  };

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
         <EditSideBar token={token} presentationId={presentationId} slideId={slideId} onConfirmClick={handleConfirmClick}></EditSideBar>
        <h1 style={{ textAlign: 'center' }}>{title}<EditTitleModal token={token} presentationId={presentationId}/></h1>
        <div style={{ position: 'relative' }}>
             <Card variant="outlined" sx={{ minWidth: 275, minHeight: 500 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    <TextBox text={text} fontSize={fontSize} colour={colour} onDelete={onDelete}/>
                </Typography>
                <div style={{ position: 'absolute', left: '10px', bottom: '70px' }}>
              {pageNumber}
           </div>
            </CardContent>
        </Card>
        <DeleteSlidePrompt token={token} slideId={slideId} presentationId={presentationId} ></DeleteSlidePrompt>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={gotoDashboard}>Back</Button>
        <DeletePresentationPrompt token={token} presentationId={presentationId}/>
        <NewSlideButton token={token} presentationId={presentationId} title={title}></NewSlideButton>
           <LeftKey slideId={slideId} presentationId={presentationId} title={title} token={token}></LeftKey>
           <RightKey slideId={slideId} presentationId={presentationId} title={title} token={token}></RightKey>

        </div>
        </div>

        </>
  )
}
