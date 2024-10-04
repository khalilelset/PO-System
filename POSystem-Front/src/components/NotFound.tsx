import React from 'react';
import { Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import theme from '../globalStyles';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        padding: 4,
      }}
    >
      <Typography variant="h1" component="h1" sx={{ fontWeight: 'bold', fontSize: '5rem', color: theme.palette.rabe3.main }}>
        404
      </Typography>
      <Typography variant="h4" component="p" sx={{ mb: 3, color: theme.palette.rabe3.main }}>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{
          textTransform: 'none',
          backgroundColor: theme.palette.telet.main,
          ':hover': {
            backgroundColor: theme.palette.rabe3.main,
          },
        }}
        onClick={handleBackToHome}
      >
        Back to Sign-Up
      </Button>
    </Container>
  );
};

export default NotFoundPage;
