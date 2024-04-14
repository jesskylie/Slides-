import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import AddTextModal from './AddTextModal';
import AddImageModal from './AddImageModal';
import AddVideoModal from './AddVideoModal';
import AddCodeModal from './AddCodeModal';

export default function EditSideBar ({ token, presentationId, slideId, onConfirmClickText, onConfirmClickImage, onConfirmClickVideo, onConfirmClickCode }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Edit</Button>
      <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
        <List>
            <ListItem disablePadding>
              <AddTextModal token={token} onConfirmClickText={onConfirmClickText} />
            </ListItem>
            <ListItem disablePadding>
              <AddImageModal token={token} onConfirmClickImage={onConfirmClickImage}></AddImageModal>
            </ListItem>
            <ListItem disablePadding>
              <AddVideoModal token={token} onConfirmClickVideo={onConfirmClickVideo}></AddVideoModal>
            </ListItem>
            <ListItem disablePadding>
              <AddCodeModal token={token} onConfirmClickCode={onConfirmClickCode}></AddCodeModal>
            </ListItem>
        </List>
        <Box sx={{ width: 120 }} role="presentation" onClick={toggleDrawer(false)}>
        </Box>
      </Drawer>
        <div>
        </div>
    </div>
  );
}
