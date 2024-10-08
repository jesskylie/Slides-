
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useParams } from 'react-router-dom';
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
 * Opens modal for user to add text to presentation slide
 */
export default function AddTextModal ({ token, onConfirmClickText }) {
  const { presentationId, slideId } = useParams();
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState('');
  const [textColour, setTextColour] = useState('');
  const [sizeWidth, setSizeWidth] = useState('');
  const [sizeHeight, setSizeHeight] = useState('');

  const handleNewText = (e) => {
    setText(e.target.value);
  }

  const handleFontSize = (e) => {
    setFontSize(e.target.value);
  }

  const handleTextColour = (e) => {
    setTextColour(e.target.value);
  }

  const handleSizeWidth = (e) => {
    setSizeWidth(e.target.value);
  }

  const handleSizeHeight = (e) => {
    setSizeHeight(e.target.value);
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  /**
 * Adds text data to database that user entered once they click confirm
 */
  const handleClose = async () => {
    try {
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
          if (slideIndex !== -1) {
            const newText = {
              textId: getRandomInt(),
              text,
              fontSize,
              textColour,
              sizeWidth,
              sizeHeight,
            };
            newStore[index].slides[slideIndex].text.push(newText);
          }
        }
      }
      await axios.put('http://localhost:5005/store', { store: newStore }, {
        headers: {
          Authorization: token
        }
      });
      onConfirmClickText();
      setOpen(false);
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
       <Button onClick={handleOpen}>Add Text</Button>
       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
       >
        <Box sx={style}>
          <TextField
            id="outlined-basic"
            label="Text"
            value={text}
            variant="outlined"
            onChange={handleNewText}
            fullWidth
            sx={{ mb: 1 }}/>
          <TextField
            id="outlined-basic"
            label="Font Size"
            value={fontSize}
            variant="outlined"
            onChange={handleFontSize}
            fullWidth
            sx={{ mb: 1 }}/>
          <TextField
            id="outlined-basic"
            label="Text Colour"
            value={textColour}
            variant="outlined"
            onChange={handleTextColour}
            fullWidth
            sx={{ mb: 1 }}/>
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
            fullWidth
            sx={{ mb: 1 }}/>
          <Button onClick={handleClose}>Confirm</Button>
        </Box>
      </Modal>
    </div>
  );
}
