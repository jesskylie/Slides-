import React from 'react';
import NavBar from '../components/NavBar'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import EditTitleModal from '../components/EditTitleModal'
import { useParams } from 'react-router-dom';
import LeftKey from '../components/LeftKey';
import RightKey from '../components/RightKey';

export default function SlidesPage ({ token, setTokenFunction }) {
  const { presentationId, title, slideId } = useParams();

  // render current slide
  return (
        <>
         <NavBar/>
        <h1 style={{ textAlign: 'center' }}>{title}<EditTitleModal token={token} presentationId={presentationId}/></h1>

        <Card variant="outlined" sx={{ minWidth: 275, minHeight: 500 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Slide: {slideId}
                </Typography>
            </CardContent>
        </Card>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
           <LeftKey slideId={slideId} presentationId={presentationId} title={title} token={token}></LeftKey>
            <RightKey slideId={slideId} presentationId={presentationId} title={title} token={token}></RightKey>
        </div>

        </>
  )
}
