import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../components/NavBar'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeletePrompt from '../components/DeletePrompt'
import EditTitleModal from '../components/EditTitleModal'
import NewSlideButton from '../components/NewSlideButton';

export default function PresentationHomePage ({ token, setTokenFunction }) {
  const { presentationId, title } = useParams();
  const navigate = useNavigate();

  const gotoDashboard = () => {
    navigate('/dashboard');
  }

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
    </>
  )
}
