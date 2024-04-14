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
import Video from '../components/Video';
import Code from '../components/Code'

export default function SlidesPage ({ token, setTokenFunction }) {
  const { presentationId, title, slideId } = useParams();
  const [pageNumber, setPageNumber] = useState('');
  const [confirmClickedText, setConfirmClickedText] = useState(false);
  const [confirmClickedImage, setConfirmClickedImage] = useState(false);
  const [confirmClickedVideo, setConfirmClickedVideo] = useState(false);
  const [confirmClickedCode, setConfirmClickedCode] = useState(false);
  const [slideIndex, setSlideIndex] = useState('');
  const [rightSlideIndex, setRightSlideIndex] = useState(false);
  const [slideLength, setSlideLength] = useState('');
  const [text, setText] = useState([]);
  const [image, setImage] = useState([]);
  const [video, setVideo] = useState([]);
  const [code, setCode] = useState([]);

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

  const handleConfirmClickVideo = () => {
    setConfirmClickedVideo(true);
  };

  const handleConfirmClickCode = () => {
    setConfirmClickedCode(true);
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
      const newVideo = [];
      const newCode = [];
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
            if (slide.video) {
              slide.video.forEach(video => {
                newVideo.push({
                  slideId: slide.slideId,
                  videoId: video.videoId,
                  sizeWidth: video.sizeWidth,
                  sizeHeight: video.sizeHeight,
                  videoURL: video.videoURL,
                  autoplay: video.autoplay
                })
              })
            }

            if (slide.code) {
              slide.code.forEach(code => {
                newCode.push({
                  slideId: slide.slideId,
                  codeId: code.codeId,
                  sizeWidth: code.sizeWidth,
                  sizeHeight: code.sizeHeight,
                  code: code.code,
                  fontSize: code.fontSize
                })
              })
            }
          }
        }
      }
      setText(newText);
      setImage(newImage);
      setVideo(newVideo);
      setCode(newCode);
    }

    if (confirmClickedText || slideId) {
      getTextAndImage();
      setConfirmClickedText(false);
    }

    if (confirmClickedImage) {
      getTextAndImage();
      setConfirmClickedImage(false);
    }
    if (confirmClickedVideo) {
      getTextAndImage();
      setConfirmClickedVideo(false);
    }
    if (confirmClickedCode) {
      getTextAndImage();
      setConfirmClickedCode(false);
    }
  }, [confirmClickedText, confirmClickedImage, confirmClickedVideo, confirmClickedCode, slideId]);

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
         <EditSideBar token={token} presentationId={presentationId} slideId={slideId} onConfirmClickText={handleConfirmClickText} onConfirmClickImage={handleConfirmClickImage} onConfirmClickVideo={handleConfirmClickVideo} onConfirmClickCode={handleConfirmClickCode}></EditSideBar>
        <h1 style={{ textAlign: 'center' }}>{title}<EditTitleModal token={token} presentationId={presentationId}/></h1>
        <div style={{ position: 'relative' }}>
          <Card variant="outlined" sx={{ width: '100%', height: 500, borderWidth: 1.3 }}>
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
                      layer={textItem.layer}
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

                    {video
                      .filter(videoItem => videoItem.slideId && videoItem.slideId.toString() === slideId)
                      .map(videoItem => (
                        <Video
                        key={videoItem.videoId}
                        sizeWidth={videoItem.sizeWidth}
                        sizeHeight={videoItem.sizeHeight}
                          videoURL={videoItem.videoURL}
                          autoplay={videoItem.autoplay}
                        />
                      ))}

                      {code
                        .filter(codeItem => codeItem.slideId && codeItem.slideId.toString() === slideId)
                        .map(codeItem => (
                        <Code
                        key={codeItem.videoId}
                        sizeWidth={codeItem.sizeWidth}
                        sizeHeight={codeItem.sizeHeight}
                          code={codeItem.code}
                          fontSize={codeItem.fontSize}
                        />
                        ))}
                </Typography>
                <div style={{ position: 'absolute', bottom: 10, left: 10 }}>
              {pageNumber}
            </div>
            </CardContent>
        </Card>
        </div>
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
      </>
  )
}
