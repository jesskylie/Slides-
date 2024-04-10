import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const PresentationCard = ({ presentationId, title, description, numSlides, slideId }) => {
  return (
    <Link to={`/dashboard/${presentationId}/${title}/${slideId}`} style={{ textDecoration: 'none' }} >
      <Card variant="outlined" sx={{ width: 200, height: 100, margin: '20px' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="p" component="div">
            {description}
          </Typography>
          <Typography variant="p" component="div">
            Number of slides: {numSlides}
          </Typography>
        </CardContent>
      </Card>
    </Link>

  );
};

export default PresentationCard;
