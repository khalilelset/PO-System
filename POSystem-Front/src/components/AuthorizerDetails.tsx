import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import axios from "axios";
import CircularD from "./CircularD";
import Alert from "@mui/material/Alert";
//import CustomButton from "../CustomStyle/CustomButton";
import CloseIcon from "@mui/icons-material/Close";
import ConfirmUpdate from "./ConfirmUpdate";
interface OrderDetailsProps {
  id: string;
  name: string;
  orderby: string;
  unitprice: number;
  quantity: number;
  description: string;
  link: string;
  analysis: string;
  status: "Pending" | "Accepted" | "Rejected";
  date: string;
  price_diff: number;
  isopen: boolean;
  score: number;
  reason: string;
  setisopen: (isOpen: boolean) => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({
  id,
  name,
  orderby,
  unitprice,
  quantity,
  description,
  status,
  date,
  link,
  analysis,
  score,
  reason,
  isopen,
  setisopen,
}) => {
  const [selectedButton, setSelectedButton] = useState<
    "success" | "error" | null
  >(null);
  const [finalstate, setfinalstate] = useState("");
  const [reasonset, setReason] = useState("");
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(false);
  //const [errorB, setErrorB] = useState(false);
  const [errorapi, seterrorapi] = useState("");
  const [open, setOpen] = React.useState(false);

  const closehandler = () => {
    setSelectedButton(null);
    setfinalstate("");
    setisopen(false);
    setOpen(false)
  };
  const handleSuccessClick = () => {
   // setErrorB(false);
   seterrorapi("")
    setSelectedButton("success");
    setfinalstate("Accepted");
    setOpen(true)
  };
  const handleUpdateOrder = (finalstate: string) => {
    toast.success(`Order ${finalstate} successfully`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
    });
  };
  const handleErrorClick = () => {
   // setErrorB(false);
   seterrorapi("")
    setSelectedButton("error");
    setfinalstate("Rejected");
    setOpen(true)
  };

  const handleButtonClick = async () => {
    seterrorapi("")
    if (!reasonset && finalstate === "Rejected") {
      setError(true); // Show an error if the reason field is empty
      return;
    }
    try {
      setloading(true);
       await axios.put(
        `https://n1458hy4ek.execute-api.us-east-1.amazonaws.com/dev/orderId/${id}`,
        {
          status: finalstate,
          reason: reasonset,
        },
        {
          headers: {
            Authorization: localStorage.getItem("idtoken"),
          },
        }
      );
      handleUpdateOrder(finalstate);
      setOpen(false)
      closehandler();
      setloading(false);
      
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) {
          seterrorapi("Unauthorized: Please log in again.");
        } else {
          const errorMessage =
            error.response.data.error ||
            "An error occurred while creating the user.";
          seterrorapi(errorMessage);
        }
      } else if (error.request) {
        seterrorapi("No response received from the server. Please try again.");
        console.error("No response received:", error.request);
      } else {
        seterrorapi(error.message || "An unexpected error occurred.");
        console.error("Error setting up the request:", error.message);
      }
    } finally {
      setloading(false);
    }
  };

  return (
    <>
    <ToastContainer />
    <Dialog
      open={isopen}
      onClose={() => setisopen(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 3,
            }}
            style={{ color: "#005858" }}
          >
            Order Details
          </Typography>
          <Box
            onClick={closehandler}
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              marginBottom: 3,
            }}
          >
            <CloseIcon color="primary" />
          </Box>
        </Box>
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
            <strong> {status} </strong>
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
        {status === "Pending" && (
          <>
            <Box
              display="inline-flex"
              sx={{
                mt: 4,
                mb: 4,
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
              }}
            >
              <CircularD score={score} />
              <Typography
                sx={{
                  m: 2,
                  color:
                    score >= 90
                      ? "primary.main"
                      : score >= 70
                      ? "warning.main"
                      : "error.main",
                }}
              >
                {analysis}
              </Typography>
            </Box>

            {score === 100 && (
              <Alert severity="success">
                Fantastic! The order is perfect and ready to be accepted! 🚀
              </Alert>
            )}
            {score >= 90 && score < 100 && (
              <Alert severity="success">
                "🤔 Almost a perfect fit! Just a tiny tweak, what do you say? 🤝"
              </Alert>
            )}
            {score < 90 && score >= 70 && (
              <Alert severity="warning">
                It's not perfect, but it's good enough. Please double check!
              </Alert>
            )}
            {score < 70 && (
              <Alert severity="error">
                Looks like this one isn't quite right. Adjust it and try again.
              </Alert>
            )}

            <Box
              m={3}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Button
                variant={
                  selectedButton === "success" ? "outlined" : "contained"
                }
                color="success"
                sx={{ mr: 4, mt: 4, mb: 3 }}
                onClick={handleSuccessClick}
              >
                Accepted
              </Button>
              <Button
                variant={selectedButton === "error" ? "outlined" : "contained"}
                color="error"
                onClick={handleErrorClick}
                sx={{ mt: 4, mb: 3 }}
              >
                Rejected
              </Button>
            </Box>
          </>
        )}

        {/*finalstate === "Rejected" && (
          <TextField
            label="your reason"
            variant="outlined"
            fullWidth
            required
            value={reasonset}
            onChange={(e) => {
              setReason(e.target.value);
              setError(false);
            }}
            error={error}
            helperText={error ? "Reason is required" : ""}
            sx={{
              maxWidth: 400,
              "& .MuiInputLabel-root": { color: "red" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "red",
                },
                "&:hover fieldset": {
                  borderColor: "red",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "red",
                },
              },
            }}
          />
        )*/}
        {/*<Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "50px",
          }}
        >
          finalstate && (
            <CustomButton onClick={handleButtonClick}>
              {loading ? "Loading..." : "Submit"}
            </CustomButton>
          )
        </Box>*/}
        
        <ConfirmUpdate
          open={open}
          setOpen={setOpen}
          handleButtonClick={handleButtonClick}
          loading={loading}
          reasonset={reasonset}
          setReason={setReason}
          finalstate={finalstate}
          error={error}
          setError={setError}
          errorapi={errorapi}
        />
      </DialogContent>
    </Dialog>
    </>
  );
};

export default OrderDetails;

/*  const [open, setOpen] = React.useState(false);*/
