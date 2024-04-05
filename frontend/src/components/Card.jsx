import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const PresentationCard = ({ presentationId, title, description }) => {
  return (
    <Link to={`/dashboard/${presentationId}/?title=${title}`} style={{ textDecoration: 'none' }} >
      <Card variant="outlined" sx={{ minWidth: 150, minHeight: 75, margin: '16px' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="p" component="div">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Link>

  );
};

export default PresentationCard;
