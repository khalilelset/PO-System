
import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Divider } from "@mui/material";
import { Box } from "@mui/system";

interface OrderDetailsProps {
  id: string;
  name: string;
  description: string;
  status: string;
  date: string;
  quantity: number;
  unit_price: number;
  totalPrice: number;
  reason: string;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({
  name,
  description,
  status,
  date,
  quantity,
 unit_price,
  totalPrice,
  reason,
  isOpen,
  onClose
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h4" fontWeight="bold" sx={{ marginBottom: 3 }} style={{ color: "#005858" }}>
          Order Details
        </Typography>
      </DialogTitle>
          <DialogContent>
            
          <Box mb={2}>
          <Typography variant="body1">
            <strong>Order Name:</strong> {name}
          </Typography>
        </Box>
        <Divider />
        <Box mt={2} mb={2}>
          <Typography variant="body1">
            <strong>Description:</strong> {description}
          </Typography>
        </Box>
        <Divider />
        <Box mt={2} mb={2} sx={{ display: "flex" }}>
          <Typography variant="body1" mr={2}>
            <strong>Status: </strong> {status}
          </Typography>
          </Box>
          <Divider />
          <Box mt={2} mb={2}>
          <Typography variant="body1">
            <strong>Date:</strong> {date}
          </Typography>
        </Box>
        <Divider />
        <Box mt={2} mb={2}>
          <Typography variant="body1">
            <strong>Quantity:</strong> {quantity}
          </Typography>
        </Box>
        <Divider />
        <Box mt={2} mb={2}>
          <Typography variant="body1">
            <strong>Unit Price: </strong>${unit_price}
          </Typography>
        </Box>         
        <Divider />

        <Box mt={2} mb={2}>
          <Typography variant="body1">
            <strong>Total Price: </strong>{totalPrice}
          </Typography>
        </Box>    
        <Divider />
        {status === "Rejected" && (
          <Box mt={2} mb={2}>
            <Typography variant="h6" mr={2} mb={1} sx={{ color: "#005858" }}>
            <strong>Reason:  </strong>
          </Typography>
           <Typography variant="body1"  sx={{ color: "#005858", fontSize: '1rem' }}>\
            <strong>
              {reason}
            </strong>
          </Typography>
            
          </Box>        
   )}

      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetails;
