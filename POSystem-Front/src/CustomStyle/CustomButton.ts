// CustomButton.tsx
import { Button } from '@mui/material';
import { styled } from '@mui/system';

const CustomButton = styled(Button)({
  backgroundColor: '#005858',
  color:'white',
  '&:hover': {
    backgroundColor: '#004040',
  },
});

export default CustomButton;
