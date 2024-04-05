import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeletePrompt from '../components/DeletePrompt'

export default function Slides () {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const title = searchParams.get('title');
  const navigate = useNavigate();
  const gotoDashboard = () => {
    navigate('/dashboard');
  }

  return (
    <>
        <NavBar/>
        <h1 style={{ textAlign: 'center' }}>{title}</h1>

        <Card variant="outlined" sx={{ minWidth: 275, minHeight: 500 }}>
            <CardContent>
                <Typography variant="h5" component="div">
            </Typography>
            </CardContent>
        </Card>
        <Button onClick={gotoDashboard}>Back</Button>
        <DeletePrompt></DeletePrompt>
    </>
  )
}
