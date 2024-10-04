import React from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";

interface OrderDetailsProps {
  name: string;
  orderby: string;
  unitprice: number;
  quantity: number;
  description: string;
  link: string;
  status: "Pending" | "Accepted" | "Rejected";
  date: string;
  reason: string;
  isopen: boolean;
  setisopen: (isOpen: boolean) => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({
  name,
  orderby,
  unitprice,
  quantity,
  description,
  link,
  status,
  date,
  reason,
  isopen,
  setisopen,
}) => {
  return (
    <Dialog
      open={isopen}
      onClose={() => setisopen(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ marginBottom: 3 }}
          style={{ color: "#005858" }}
        >
          Order Details
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <Typography variant="body1">
            <strong>Name:</strong> {name}
          </Typography>
        </Box>
        <Divider />
        <Box mt={2} mb={2}>
          <Typography variant="body1">
            <strong>Ordered By:</strong> {orderby}
          </Typography>
        </Box>
        <Divider />
        <Box mt={2} mb={2}>
          <Typography variant="body1">
            <strong>Unit Price:</strong> ${Number(unitprice).toFixed(2)}
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
            <strong>Total Price:</strong> ${(unitprice * quantity).toFixed(2)}
          </Typography>
        </Box>
        <Divider />
        <Box mt={2} mb={2}>
          <Typography variant="body1">
            <strong>Description:</strong> {description}
          </Typography>
        </Box>
        <Divider />
        <Box mt={2} mb={2}>
          <Typography variant="body1">
            <strong>Link of order: </strong> {link}
          </Typography>
        </Box>
        <Divider />
        <Box mt={2} mb={2}>
          <Typography variant="body1">
            <strong>Date:</strong> {date}
          </Typography>
        </Box>
        <Divider />
        <Box mt={2} mb={2} sx={{ display: "flex" }}>
          <Typography variant="body1" mr={2}>
            <strong>Status: </strong>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color:
                status === "Rejected"
                  ? "red"
                  : status === "Accepted"
                  ? "green"
                  : "blue",
            }}
          >
            <strong> {status}</strong>
          </Typography>
        </Box>
        <Divider />
        {status === "Rejected" && (
          <Box mt={2} mb={2}>
            <Typography variant="h6" mr={2} mb={1} sx={{ color: "#005858" }}>
              <strong>Reason: </strong>
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#005858", fontSize: "1rem" }}
            >
              <strong>{reason}</strong>
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetails;
