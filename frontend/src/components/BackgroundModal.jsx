
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
 * Opens modal for user to change background of presentation slide
 */
export default function BackgroundModal ({ token, onConfirmClickColour }) {
  const { presentationId, slideId } = useParams();
  const [open, setOpen] = React.useState(false);
  const [colour, setColour] = useState('');
  const [gradient, setGradient] = useState('');
  const handleColour = (e) => {
    setColour(e.target.value);
  }
  const handleGradient = (e) => {
    setGradient(e.target.value);
  }
  const handleOpen = () => {
    setOpen(true);
  };
    /**
   * Saves background colour that user entered into database
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
            newStore[index].slides[slideIndex].backgroundColour = colour;
          }
        }
      }
      await axios.put('http://localhost:5005/store', { store: newStore }, {
        headers: {
          Authorization: token
        }
      });
      onConfirmClickColour();
      setOpen(false);
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Button
        variant="outlined"
        size="small"
        onClick={handleOpen}
        sx={{ mt: 1 }}>
        Change background
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            id="outlined-basic"
            label="Colour"
            value={colour}
            variant="outlined"
            onChange={handleColour}
            fullWidth/>
           <TextField
            id="outlined-basic"
            label="Gradient (Yes/No)"
            value={gradient}
            variant="outlined"
            onChange={handleGradient}
            fullWidth/>
          <Button onClick={handleClose}>Confirm</Button>
        </Box>
      </Modal>
    </div>
  )
}
