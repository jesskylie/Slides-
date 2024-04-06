import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

export default function EditTitleModal ({ token, presentationId }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const handleNewTitle = (e) => {
    setTitle(e.target.value);
  }

  const updateTitleName = async () => {
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
      // Loop through the indexs of the newStore
      for (const index in newStore) {
        const presentationIdAsString = newStore[index].presentationId.toString();
        if (presentationIdAsString === presentationId) {
          newStore[index].title = newTitle;
        }
      }
      await axios.put('http://localhost:5005/store', { store: newStore }, {
        headers: {
          Authorization: token
        }
      });
      navigate(`/dashboard/${presentationId}/${newTitle}`);
      console.log(9);
      handleClose();
    } catch (error) {
      alert(error.response.data.error);
    }
  }

  return (
    <>
      <ModeEditIcon onClick={handleOpen} style={{ fontSize: '0.6em', cursor: 'pointer', paddingLeft: '8px' }}></ModeEditIcon>
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit title
            </Typography>
            <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                value={title}
                onChange={handleNewTitle}
            />
            <Button onClick={updateTitleName}>Update</Button>
          </Box>
        </Modal>
    </>
  );
}
