import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import AddTextModal from './AddTextModal';

export default function EditSideBar ({ token, presentationId, slideId, onConfirmClick }) {
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
            <AddTextModal token={token} onConfirmClick={onConfirmClick} />
            </ListItem>
        </List>
        <Box sx={{ width: 150 }} role="presentation" onClick={toggleDrawer(false)}>
        </Box>
      </Drawer>
        <div>
        </div>
    </div>
  );
}
