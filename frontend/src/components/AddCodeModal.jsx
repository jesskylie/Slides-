
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
 * Modal opens when Add Code is clicked
 * Allows user to add code to presentation slide
 */
export default function AddCodeModal ({ token, onConfirmClickCode }) {
  const { presentationId, slideId } = useParams();
  const [open, setOpen] = useState(false);
  const [sizeWidth, setSizeWidth] = useState('');
  const [sizeHeight, setSizeHeight] = useState('');
  const [code, setCode] = useState('');
  const [fontSize, setFontSize] = useState('');

  const handleOpen = () => setOpen(true);

  const handleSizeWidth = (e) => {
    setSizeWidth(e.target.value);
  }

  const handleSizeHeight = (e) => {
    setSizeHeight(e.target.value);
  }

  const handleCode = (e) => {
    setCode(e.target.value);
  }

  const handleFontSize = (e) => {
    setFontSize(e.target.value);
  }

  /**
   * Function called when confirm button is clicked
   * Updates code user entered to be stored in database
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
          if (!newStore[index].slides[slideIndex].image) {
            newStore[index].slides[slideIndex].image = [];
          }
          if (slideIndex !== -1) {
            const newCode = {
              codeId: getRandomInt(),
              sizeWidth,
              sizeHeight,
              code,
              fontSize,
              layer: newStore[index].slides[slideIndex].image.length + 1 // Assign layer based on current image count
            };
            newStore[index].slides[slideIndex].code.push(newCode);
          }
        }
      }
      await axios.put('http://localhost:5005/store', { store: newStore }, {
        headers: {
          Authorization: token
        }
      });
      onConfirmClickCode()
      setOpen(false);
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Button onClick={handleOpen}>Add Code</Button>
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
             fullWidth
             sx={{ mb: 1 }}/>
           <TextField
             id="outlined-basic"
             label="Code"
             value={code}
             variant="outlined"
             onChange={handleCode}
             fullWidth sx={{ mb: 1 }}/>
           <TextField
             id="outlined-basic"
             label="Font Size"
             value={fontSize}
             variant="outlined"
             onChange={handleFontSize}
             fullWidth sx={{ mb: 1 }}/>
           <Button onClick={handleClose}>Confirm</Button>
         </Box>
       </Modal>
     </div>
  )
}
