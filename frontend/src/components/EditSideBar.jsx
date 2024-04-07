import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import CodeIcon from '@mui/icons-material/Code';

export default function EditSideBar () {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleClick = (text) => {
    console.log(`Clicked ${text}`);
    if (text === 'Add Text') {
      console.log('add text');
    }
  };

  const DrawerList = (
    <Box sx={{ width: 150 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Add Text', 'Image', 'Video', 'Code'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleClick(text)}>
              <ListItemIcon>
              {text === 'Add Text' && <TextFieldsIcon />}
              {text === 'Image' && <AddPhotoAlternateIcon />}
              {text === 'Video' && <OndemandVideoIcon />}
              {text === 'Code' && <CodeIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Edit</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
