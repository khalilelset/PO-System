import  { useState } from "react";
import { toast ,ToastContainer} from 'react-toastify';
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import theme from "../../globalStyles";
//import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import {signUp } from "@aws-amplify/auth";
//import  Auth  from 'aws-amplify/auth';


/*
const CustomToggleButton = styled(ToggleButton)(({ theme, selected }) => ({
  backgroundColor: selected ? "white" : theme.palette.telet.main,
  color: "white",
  "&:hover": {
    backgroundColor: theme.palette.rabe3.main,
  },
}));*/

function MyModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [errorapi, seterrorapi] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setloading] = useState(false);
  const [role, setRole] = useState("Authorizer");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
 const navigate = useNavigate();

  const handleAddingUser = () => {
    toast.success('User added successfully & we send invitation email!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
    });
  };


  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleUsernameChange = (event: any) => {
    seterrorapi('')
    const value = event.target.value;
    setUsername(value);
     if (value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "",
      }));
  } 
}

const handleEmailChange = (event: any) => {
  seterrorapi('')
  const value = event.target.value;
  setEmail(value);
  if (isValidEmail(value)) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: "",
    }));
  } 
}
  const handleSubmit = async () => {
    try {
     /* if (!username.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: "fullname is required",
        }));
      }
        if (!isValidEmail(email)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "Invalid email format",
          }));}*/
        if(username.trim() && isValidEmail(email)){
      setloading(true);
        await axios.post(
        "https://n1458hy4ek.execute-api.us-east-1.amazonaws.com/dev/user",
        {
          FULLNAME: username,
          email: email,
          position: role,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem('idtoken') || ''
          },
        }
      );
      handleAddingUser()
      handleClose();
      setTimeout(() => {
        navigate(0);
      }, 3000)
     // window.location.reload();
    }
  } catch (error : any) {
    if (error.response) {
      if (error.response.status === 401) {
        seterrorapi('Unauthorized: Please log in again.');
      }else{
      const errorMessage = error.response.data.error || 'An error occurred while creating the user.';
      seterrorapi(errorMessage);
        }
    } else if (error.request) {
      
      seterrorapi('No response received from the server. Please try again.');
      console.error('No response received:', error.request);
    } else {
      
      seterrorapi(error.message || 'An unexpected error occurred.');
      console.error('Error setting up the request:', error.message);
    }
  }
  
  finally {
    setloading(false);
  }
  };

  return (
    <div>
<ToastContainer />
      <Button
        variant="contained"
        sx={{
          backgroundColor: theme.palette.telet.main,
          marginBottom: 6,
          marginTop: 6,
          "&:hover": {
            backgroundColor: theme.palette.rabe3.main,
          },
          textAlign: "right",
        }}
        onClick={handleOpen}
        startIcon={<AddIcon />}
      >
        Add User
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "none",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ marginBottom: 3 }}
            style={{ color: theme.palette.rabe3.main }}
          >
            Create User
          </Typography>
          <TextField
            label="Full Name"
            value={username}
            onChange={handleUsernameChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.email}
            helperText={errors.email}
          />

{/*
          <ToggleButtonGroup
            value={role}
            exclusive
            onChange={(e : any) => { setRole(e.target.value) }}
            fullWidth
            sx={{
              marginTop: 4,
              marginBottom: 4,
            }}
          >
            <CustomToggleButton value="Admin" selected={role === "Admin"}>
              Admin
            </CustomToggleButton>
            <CustomToggleButton
              value="Authorizer"
              selected={role === "Authorizer"}
            >
              Authorizer
            </CustomToggleButton>
            <CustomToggleButton value="Employee" selected={role === "Employee"}>
              Employee
            </CustomToggleButton>
          </ToggleButtonGroup>
*/}
<FormControl fullWidth sx={{
              marginTop: 4,
              marginBottom: 4,
            }}>
  <InputLabel id="demo-simple-select-label">Role</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={role}
    label="Role"
    onChange={(e : any) => { setRole(e.target.value) }}
  >
    <MenuItem value={"Admin"}><strong>Admin</strong></MenuItem>
    <MenuItem value={"Authorizer"}><strong>Authorizer</strong></MenuItem>
    <MenuItem value={"Employee"}><strong>Employee</strong></MenuItem>
  </Select>
</FormControl>
          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.palette.telet.main,
              "&:hover": {
                backgroundColor: theme.palette.rabe3.main,
              },
            }}
            onClick={handleSubmit}
            disabled={!(username.trim()&&isValidEmail(email) )||  loading}
          >
           {loading ? "Loading..." : "ADD User"}
          </Button>
          {errorapi && (
        <Box p={1} fontSize="15px" color="red">
           {errorapi}
        </Box>
      )}
        </Box>
      </Modal>
      
    </div>
  );
}
export default MyModal;

/*
  const validateForm = () => {
    const newErrors = { username: "", email: "", password: "" };

    if (!username) {
      newErrors.username = "Username is required.";
    }

    if (!email || !isValidEmail(email)) {
      newErrors.email = "Invalid email address.";
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== "");
  };
  const generateRandomPassword = (length: number) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////
/*  const handleSubmit =async () => {
    const isValid = validateForm();

    if (isValid) {
      console.log("Form submitted:", { username, email, role });
     // handleClose();
    }
    const password = generateRandomPassword(12);
   try{
    const user : any =await signUp({
      username: email,
      password: password,
      options: {
        userAttributes: {
          email: email,
         name : username,
         'custom:role': 'admin',
        },
      }
    });
    console.log('Sign-up successful' , user);
  } catch (error) {
    console.error('Error signing up:', error);
  }

  };*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
