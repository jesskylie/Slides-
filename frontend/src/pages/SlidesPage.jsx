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
import Image from '../components/Image';

export default function SlidesPage ({ token, setTokenFunction }) {
  const { presentationId, title, slideId } = useParams();
  const [pageNumber, setPageNumber] = useState('');
  const [confirmClickedText, setConfirmClickedText] = useState(false);
  const [confirmClickedImage, setConfirmClickedImage] = useState(false);
  const [slideIndex, setSlideIndex] = useState('');
  const [rightSlideIndex, setRightSlideIndex] = useState(false);
  const [slideLength, setSlideLength] = useState('');
  const [text, setText] = useState([]);
  const [image, setImage] = useState([]);

  const navigate = useNavigate();

  const gotoDashboard = () => {
    navigate('/dashboard');
  }

  const handleConfirmClickText = () => {
    setConfirmClickedText(true);
  };

  const handleConfirmClickImage = () => {
    setConfirmClickedImage(true);
  };

  useEffect(() => {
    const getTextAndImage = async () => {
      const response = await axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token
        }
      })
      const currStore = response.data.store.store;
      const newText = [];
      const newImage = [];
      for (const index in currStore) {
        if (currStore[index].presentationId.toString() === presentationId) {
          const slide = currStore[index].slides.find(slide => slide.slideId.toString() === slideId);
          if (slide !== -1) {
            if (slide.text) {
              slide.text.forEach(text => {
                newText.push({
                  slideId: slide.slideId,
                  textId: text.textId,
                  text: text.text,
                  fontSize: text.fontSize,
                  textColour: text.textColour,
                  sizeWidth: text.sizeWidth,
                  sizeHeight: text.sizeHeight
                })
              })
            }
            if (slide.image) {
              slide.image.forEach(image => {
                newImage.push({
                  slideId: slide.slideId,
                  imageId: image.imageId,
                  sizeWidth: image.sizeWidth,
                  sizeHeight: image.sizeHeight,
                  imageURL: image.imageURL,
                  imageDescription: image.imageDescription
                })
              })
            }
          }
        }
      }
      setText(newText)
      setImage(newImage);
    }

    if (confirmClickedText || slideId) {
      getTextAndImage();
      setConfirmClickedText(false);
    }

    if (confirmClickedImage) {
      getTextAndImage();
      setConfirmClickedImage(false);
    }
  }, [confirmClickedText, confirmClickedImage, slideId]);

  const onDelete = (event) => {
    if (event) {
      event.preventDefault();
    }
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
          if (currSlideIndex === 0) {
            setSlideIndex(true);
          }
          if (currStore[key].slides.length > 1) {
            setRightSlideIndex(true);
          }
          setPageNumber(currSlideIndex + 1);
          setSlideIndex(currSlideIndex);
          setSlideLength(currStore[key].slides.length)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleRightKey();
  }, [slideId])

  // render current slide
  return (
        <>
         <NavBar/>
         <EditSideBar token={token} presentationId={presentationId} slideId={slideId} onConfirmClickText={handleConfirmClickText} onConfirmClickImage={handleConfirmClickImage}></EditSideBar>
        <h1 style={{ textAlign: 'center' }}>{title}<EditTitleModal token={token} presentationId={presentationId}/></h1>
        <div style={{ position: 'relative' }}>
             <Card variant="outlined" sx={{ width: 1000, height: 500, borderWidth: 1.3 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                {text
                  .filter(textItem => textItem.slideId.toString() === slideId)
                  .map(textItem => (
                    <TextBox
                      key={textItem.textId}
                      text={textItem.text}
                      fontSize={textItem.fontSize}
                      colour={textItem.textColour}
                      width={textItem.sizeWidth}
                      height= {textItem.sizeHeight}
                      onDelete={onDelete}
                    />
                  ))}

                  {image
                    .filter(imageItem => imageItem.slideId && imageItem.slideId.toString() === slideId)
                    .map(imageItem => (
                        <Image
                        key={imageItem.imageId}
                        sizeWidth={imageItem.sizeWidth}
                        sizeHeight={imageItem.sizeHeight}
                          imageURL={imageItem.imageURL}
                          imageDescription={imageItem.imageDescription}
                        />
                    ))}
                </Typography>
                <div style={{ position: 'absolute', left: '10px', bottom: '70px' }}>
              {pageNumber}
           </div>
            </CardContent>
        </Card>
        <DeleteSlidePrompt token={token} slideId={slideId} presentationId={presentationId} ></DeleteSlidePrompt>
        <Button onClick={gotoDashboard}>Back</Button>
        <DeletePresentationPrompt token={token} presentationId={presentationId}/>
        <NewSlideButton token={token} presentationId={presentationId} title={title}></NewSlideButton>
        {slideIndex > 0 && (
          <LeftKey slideId={slideId} presentationId={presentationId} title={title} token={token}></LeftKey>
        )}
        {rightSlideIndex && (slideIndex !== slideLength - 1) && (
          <>
            <RightKey slideId={slideId} presentationId={presentationId} title={title} token={token}></RightKey>
          </>

        )}

        </div>

        </>
  )
}
