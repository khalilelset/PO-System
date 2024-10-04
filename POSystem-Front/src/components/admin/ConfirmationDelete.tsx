import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading:boolean
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  loading
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant="h6">Confirm Deletion</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to delete this user? This action cannot be
          undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          sx={{
            backgroundColor: "rgb(200,0,0)",
            color: "white",
            "&:hover": {
              backgroundColor: "#b71c1c",
            },
          }}
          onClick={() => {
            onConfirm();
          }}
          disabled={loading}
        >
          {loading ? "Loading..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
