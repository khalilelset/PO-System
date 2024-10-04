import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, TextField } from '@mui/material';

/*

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading:boolean
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({

*/

interface ConfirmUpdateI {
  open: boolean;
  setOpen: (arg0: boolean) => void;
  handleButtonClick: () => Promise<void>;
  loading: boolean;
  reasonset:string;
  setReason:(arg0: string) => void;
  finalstate:string;
  error:boolean;
  setError:(arg0: boolean) => void;
  errorapi:string
}
 const ConfirmUpdate: React.FC<ConfirmUpdateI> = ({open,setOpen,handleButtonClick , loading , reasonset , setReason , finalstate , error,setError , errorapi})=> {
  



  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <strong> Confirm as {finalstate}</strong>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          Once you proceed, you cannot undo this decision. Do you really want to continue?
          </DialogContentText>
          {finalstate==="Rejected" ? (
            <>
            <DialogContentText>
            please , tell us why you reject this order 
            </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="reason"
            label="your Reason"
            type="text"
            fullWidth
            variant="standard"
            value={reasonset}
            onChange={(e) => {
              setReason(e.target.value);
              setError(false);
            }}
            error={error}
            helperText={error ? "Reason is required" : ""}
          /> </>):(<></>)}
        </DialogContent>
        {errorapi && (
          <Box p={1} fontSize="15px" color="red">
            {errorapi}
          </Box>
        )}
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
          autoFocus
          sx={{
            backgroundColor: "#388e3c",
            color: "white",
            "&:hover": {
              backgroundColor: "#2e7d32",
            },
          }}
          onClick={() => {handleButtonClick()}}
          disabled={loading}
        >
          {loading ? "Loading..." : "Continue"}
        </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default ConfirmUpdate