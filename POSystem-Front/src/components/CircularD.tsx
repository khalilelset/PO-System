import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


interface interfaceCirProp {
    score:number
  }

 const  CircularProgressWithLabel : React.FC<interfaceCirProp> = ({score}) => {

  return (
    <Box position="relative" display="inline-flex" sx={{ alignItems: 'center',
      justifyContent: 'center',}} >
      <CircularProgress
        variant="determinate"
        value={score}
        size={150}
        thickness={5}
        
        sx={{
          color: score >= 90 ? 'primary.main' 
                : score >= 70 ? 'warning.main' 
                : 'error.main',
               
        }}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4" component="div" color="textSecondary"  sx={{
          color: score >= 90 ? 'primary.main' 
                : score >= 70 ? 'warning.main' 
                : 'error.main',
        }}> 
          {`${Math.round(score)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export default CircularProgressWithLabel;