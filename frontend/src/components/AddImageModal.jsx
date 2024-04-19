
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getRandomInt } from '../helper';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  maxWidth: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

/**
 * Modal opens when add image is clicked
 * Allows user to add images to the presentation slide
 */
export default function AddImageModal ({ token, onConfirmClickImage }) {
  const { presentationId, slideId } = useParams();
  const [open, setOpen] = useState(false);
  const [sizeWidth, setSizeWidth] = useState('');
  const [sizeHeight, setSizeHeight] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [imageDescription, setImageDescription] = useState('');

  const handleOpen = () => setOpen(true);

  const handleSizeWidth = (e) => {
    setSizeWidth(e.target.value);
  }

  const handleSizeHeight = (e) => {
    setSizeHeight(e.target.value);
  }

  const handleImageURL = (e) => {
    setImageURL(e.target.value);
  }

  const handleImageDescription = (e) => {
    setImageDescription(e.target.value);
  }
  /**
 * Stores image data in database when confirm is clicked
 */
  const handleClose = async () => {
    try {
      // get data
      const response = await axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token
        }
      });
      const currStore = response.data.store.store;
      const newStore = { ...currStore };
      for (const index in newStore) {
        if (newStore[index].presentationId.toString() === presentationId) {
          const slideIndex = newStore[index].slides.findIndex(slide => slide.slideId.toString() === slideId);
          if (!newStore[index].slides[slideIndex].image) {
            newStore[index].slides[slideIndex].image = [];
          }
          if (slideIndex !== -1) {
            const newImage = {
              imageId: getRandomInt(),
              sizeWidth,
              sizeHeight,
              imageURL,
              imageDescription,
            };
            newStore[index].slides[slideIndex].image.push(newImage);
          }
        }
      }
      await axios.put('http://localhost:5005/store', { store: newStore }, {
        headers: {
          Authorization: token
        }
      });
      onConfirmClickImage()
      setOpen(false);
    } catch (error) {
      console.log(error)
    }
  }
  return (
        <div>
          <Button onClick={handleOpen}>Add Image</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
           <Box sx={style}>
             <TextField
               id="outlined-basic"
               label="Size: width"
               value={sizeWidth}
               variant="outlined"
               onChange={handleSizeWidth}
               fullWidth
               sx={{ mb: 1 }}/>
             <TextField
               id="outlined-basic"
               label="Size: height"
               value={sizeHeight}
               variant="outlined"
               onChange={handleSizeHeight}
               fullWidth sx={{ mb: 1 }}/>
             <TextField
               id="outlined-basic"
               label="Image URL"
               value={imageURL}
               variant="outlined"
               onChange={handleImageURL}
               fullWidth
               sx={{ mb: 1 }}/>
             <TextField
               id="outlined-basic"
               label="Image Description"
               value={imageDescription}
               variant="outlined"
               onChange={handleImageDescription}
               fullWidth
               sx={{ mb: 1 }}/>
             <Button onClick={handleClose}>Confirm</Button>
           </Box>
         </Modal>
       </div>
  )
}
