import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading() {
  return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh', // Full height of the viewport
            width: '100vw',  // Full width of the viewport
            position: 'fixed', // Make sure it covers the full page
            marginBottom:'100px',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: A semi-transparent background
           // zIndex: 9999, // Ensure it appears on top of other content
          }}
        >
          <CircularProgress size={100} /> {/* Size adjusted to be very big */}
        </Box>
      );

    
  
}