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

/**
 * Edit button opens sidebar for user to add text, image, code or video to the slides page
 */
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
              <AddTextModal
                token={token}
                onConfirmClickText={onConfirmClickText}
              />
            </ListItem>
            <ListItem disablePadding>
              <AddImageModal
                token={token}
                onConfirmClickImage={onConfirmClickImage}
              />
            </ListItem>
            <ListItem disablePadding>
              <AddVideoModal
                token={token}
                onConfirmClickVideo={onConfirmClickVideo}
              />
            </ListItem>
            <ListItem disablePadding>
              <AddCodeModal
                token={token}
                onConfirmClickCode={onConfirmClickCode}
              />
            </ListItem>
        </List>
        <Box
          sx={{ width: 120 }}
          role="presentation"
          onClick={toggleDrawer(false)}>
        </Box>
      </Drawer>
    </div>
  );
}
