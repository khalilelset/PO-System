import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import CustomButton from "../../CustomStyle/CustomButton";
import theme from "../../globalStyles";
import ConfirmationDelete from "./ConfirmationDelete";
import { toast, ToastContainer } from "react-toastify";
import React, { useEffect, useState } from "react";
//import EditUser from "./EditUser";
import { useNavigate } from "react-router-dom";
import axios from "axios";
interface OrderDetails {
  id: string;
  username: string;
  email: string;
  role: "Admin" | "Authorizer" | "Employee";
  isopen: boolean;
  setisopen: (arg0: boolean) => void;
}

const UserDetails: React.FC<OrderDetails> = ({
  id,
  username,
  email,
  role,
  isopen,
  setisopen,
}) => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setloading] = useState(false);


  useEffect(() => {
    if (isopen) {
      setfullname(username);
      setemail(email);
    }
  }, [isopen, username, email]);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };
  const handleConfirmDelete = async () => {
    setloading(true);
    try {
      const response = await fetch(
        `https://n1458hy4ek.execute-api.us-east-1.amazonaws.com/dev/user/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: localStorage.getItem("idtoken") || "",
          },
        }
      );

      if (response.ok) {
        toast.success("User deleted successfully", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          draggable: true,
          pauseOnHover: true,
        });
        setTimeout(() => {
          navigate(0);
        }, 300);
      } else {
        toast.error("Error deleting user", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          draggable: true,
          pauseOnHover: true,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      toast.error("Error deleting user", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
      });
    } finally {
      setloading(false);
    }
  };


  const [edit, setEdit] = React.useState(false);
  const [fullname, setfullname] = React.useState(username);
  const [semail, setemail] = React.useState(email);
  const [error,seterror] = React.useState("")
  const handleOpen = () => setEdit(true);
  const handleCancel = () => {
    setEdit(false);
    setfullname(username)
    setemail(email)
  };




  const handleSubmit = async () => {
   
    const bodyData: any = {};

    // Add only if `fullName` is provided
    if (fullname) {
      bodyData.FULLNAME = fullname;
    }

    // Add only if `email` is provided
    if (semail) {
      bodyData.email = semail;
    }
    if (Object.keys(bodyData).length > 0) {
      try {
        setloading(true);
        const response = await axios.put(
          `https://n1458hy4ek.execute-api.us-east-1.amazonaws.com/dev/updateuserId/${id}`,
          bodyData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setEdit(false)
        } else {
          seterror("Something went wrong!");
        }
      } catch (error: any) {
        if (error.response) {
          seterror(
            error.response.data.error || "An unexpected error occurred."
          );
        } else if (error.request) {
          seterror("No response received from server.");
        } else {
          seterror("Error setting up request: " + error.message);
        }
      } finally {
        setloading(false);
      }
    } else seterror("update name or email!!!");
  };
  return (
    <>
      <ToastContainer />
      {isopen ? (
        <Dialog open={isopen} onClose={() => {}} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ marginBottom: 3 }}
              style={{ color: "#005858" }}
            >
              User Details
            </Typography>
          </DialogTitle>


          <DialogContent>
            <Box mb={2}>
              
              <Typography variant="body1" >
              <strong>User Name:</strong> { edit ? (<TextField
              variant="standard"
              value={fullname}
              onChange={(e) => (setfullname(e.target.value))}
              sx={{ mt: -0.5 , width: '50%' }}
            />) : (`${fullname}`) }
              </Typography>
              
            </Box>
            <Divider />
            <Box mt={2} mb={2}>
              <Typography variant="body1">
                <strong>Email:</strong> { edit ? (<TextField
              variant="standard"
              value={semail}
              onChange={(e) => (setemail(e.target.value))}
              sx={{ mt: -0.5 , width: '50%' }}
            />) : (`${semail}`) }
              </Typography>
            </Box>

            

            <Divider />
            <Box mt={2} mb={2} sx={{ display: "flex" }}>
              <Typography variant="body1" mr={2}>
                <strong>Role: </strong>
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.telet.main }}
              >
                {role}
              </Typography>
            </Box>
            <Divider />
          </DialogContent>
          <DialogActions>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              {edit ? (
                <>
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  {error && (
        <Box p={1} fontSize="15px" color="red">
           {error}
        </Box>
      )}
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleSubmit}
                    sx={{ ml: 2 }}
                    disabled={loading}
                  >
                  {loading ? "Loading..." : "Save"}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    sx={{
                      backgroundColor: "rgb(200,0,0)",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#b71c1c",
                      },
                    }}
                    onClick={() => setIsDialogOpen(true)}
                  >
                    Delete User
                  </Button>
                  <ConfirmationDelete
                    loading={loading}
                    open={isDialogOpen}
                    onClose={handleDialogClose}
                    onConfirm={handleConfirmDelete}
                  />
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleOpen}
                  >
                    Edit User
                  </Button>
                  <CustomButton onClick={()=>{setisopen(false)}}>
                    Close
                  </CustomButton>
                </>
              )}
            </Box>
          </DialogActions>
        </Dialog>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserDetails;
