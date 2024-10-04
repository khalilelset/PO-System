import { Button } from '@mui/material';
import { styled } from '@mui/system';


const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
    transition: 'background-color 0.3s, transform 0.3s',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      transform: 'scale(1.05)',
    },
    '&.selected': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  }));


  export default StyledButton;