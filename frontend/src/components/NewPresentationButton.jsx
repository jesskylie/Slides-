import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function NewPresentationButton ({ token, setToken }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const handleNewTitle = (e) => {
    setTitle(e.target.value);
  }

  const handleNewDescription = (e) => {
    setDescription(e.target.value);
  }

  function getRandomInt (min = 0, max = 1000) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const createNewPresentation = async () => {
    try {
      // get old store
      const response = await axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token
        }
      });

      const currStore = response.data.store.store;

      // Get the title from the text field or provide a default value
      const newTitle = title;

      // create copy of old store
      const newStore = { ...currStore };

      // send back new store to replace old store
      const newSlideId = getRandomInt();
      const newData = {
        presentationId: getRandomInt(),
        title: newTitle,
        description,
        slides: [{
          slideId: newSlideId,
          text: [],
        }]
      }

      newStore[`${newData.title}`] = newData;

      await axios.put('http://localhost:5005/store', { store: newStore }, {
        headers: {
          Authorization: token
        }
      });
      handleClose();
      navigate(`/dashboard/${newData.presentationId}/${newData.title}/${newSlideId}`);
    } catch (error) {
      alert(error.response.data.error);
    }
  }

  return (
      <div>
        <Button onClick={handleOpen}>New Presentation</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              New Presentation
            </Typography>
            <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                value={title}
                onChange={handleNewTitle}
            />
            <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                value={description}
                onChange={handleNewDescription}
            />
            <Button onClick={createNewPresentation}>Create</Button>
          </Box>
        </Modal>
      </div>
  );
}
