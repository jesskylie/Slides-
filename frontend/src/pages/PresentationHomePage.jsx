import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../components/NavBar'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeletePrompt from '../components/DeletePrompt'
import EditTitleModal from '../components/EditTitleModal'
import NewSlideButton from '../components/NewSlideButton';
import RightKey from '../components/RightKey';
import axios from 'axios';

export default function PresentationHomePage ({ token, setTokenFunction }) {
  const { presentationId, title, slideId } = useParams();
  const [rightKey, setRightKey] = useState(false);
  const navigate = useNavigate();

  const gotoDashboard = () => {
    navigate('/dashboard');
  }

  // executes this code every time something in this state changes
  useEffect(() => {
    axios.get('http://localhost:5005/store', {
      headers: {
        Authorization: token
      }
    }).then((response) => {
      const currStore = response.data.store.store;
      Object.keys(currStore).forEach(key => {
        if (currStore[key].presentationId.toString() === presentationId) {
          if (currStore[key].slides.length >= 1) {
            setRightKey(true);
          }
        }
      })
    })
  }, [])

  return (
    <>
        <NavBar/>
        <h1 style={{ textAlign: 'center' }}>{title}<EditTitleModal token={token} presentationId={presentationId}/></h1>
        <Card variant="outlined" sx={{ minWidth: 275, minHeight: 500 }}>
            <CardContent>
                <Typography variant="h5" component="div">
            </Typography>
            </CardContent>
        </Card>
        <Button onClick={gotoDashboard}>Back</Button>
        <DeletePrompt token={token} presentationId={presentationId}></DeletePrompt>
        <NewSlideButton token={token} presentationId={presentationId} title={title}></NewSlideButton>
        {rightKey && <RightKey slideId={slideId} presentationId={presentationId} title={title} token={token}/>}
    </>
  )
}
