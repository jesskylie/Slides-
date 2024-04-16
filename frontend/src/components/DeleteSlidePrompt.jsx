import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function DeleteSlidePrompt ({ token, slideId, presentationId }) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseDeleteSlide = async () => {
    try {
      // get old store
      const response = await axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token
        }
      });
      const currStore = response.data.store.store;
      // create copy of old store
      const newStore = { ...currStore };
      // Loop through the indexes of the newStore
      for (const index in newStore) {
        const presentationIdAsString = newStore[index].presentationId.toString();
        if (presentationIdAsString === presentationId) {
          const slideIdToFind = newStore[index].slides.findIndex(slide => slide.slideId.toString() === slideId);
          console.log(slideId);
          console.log(slideIdToFind);
          if (slideIdToFind !== -1) {
            newStore[index].slides.splice(slideIdToFind, 1);
          }
        }
      }

      await axios.put('http://localhost:5005/store', { store: newStore }, {
        headers: {
          Authorization: token
        }
      });
      handleClose();
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  }

  return (
        <React.Fragment>
          <Button variant="outlined" size="small" onClick={handleClickOpen} sx={{ mr: 1, mt: 1 }}>
            Delete Slide
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {'Are you sure'}
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleClose}>No</Button>
              <Button onClick={handleCloseDeleteSlide} autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
  );
}
