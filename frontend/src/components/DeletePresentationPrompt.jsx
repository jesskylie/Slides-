import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function DeletePresentationPrompt ({ token, presentationId }) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseDelete = async () => {
    try {
      // get old store
      const response = await axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token
        }
      });
      const currStore = response.data.store.store;
      console.log(presentationId)
      // create copy of old store
      const newStore = { ...currStore };
      console.log('New store before delete', JSON.stringify(newStore))
      // Loop through the indexs of the newStore
      for (const index in newStore) {
        const presentationIdAsString = newStore[index].presentationId.toString();
        if (presentationIdAsString === presentationId) {
          delete newStore[index];
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
      <Button variant="outlined" size="small" onClick={handleClickOpen} sx={{
        mr: 1,
        mt: 1,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '100%',
      }}>
        Delete Presentation
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
          <Button onClick={handleCloseDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
