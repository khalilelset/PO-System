import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TitleBar from '../components/TitleBar';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function FormPropsTextFields() {
  const navigate = useNavigate();
  const [errorapi, seterrorapi] = useState('');
  const [loading, setloading] = useState(false);
  const [formData, setFormData] = useState({
    order_name: '',
    unit_price: '',
    quantity: '',
    link: '',
    order_desc: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    seterrorapi('');
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value !== '');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const idToken = localStorage.getItem('idtoken');
    try {
      setloading(true);
      const response = await axios.post(
        'https://n1458hy4ek.execute-api.us-east-1.amazonaws.com/dev/createorders',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            ...(idToken ? { Authorization: idToken } : {})
          }
        }
      );
      if (response.status === 200 || response.status === 201) {
        setSubmitted(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        navigate('/EmployeeDashboard');
        setFormData({
          order_name: '',
          unit_price: '',
          quantity: '',
          link: '',
          order_desc: ''
        });
      } else {
        console.error('Failed to submit the form');
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) {
          seterrorapi('Unauthorized: Please log in again.');
        } else {
          const errorMessage =
            error.response.data.error || 'An error occurred while creating the order.';
          seterrorapi(errorMessage);
        }
      } else if (error.request) {
        seterrorapi('No response received from the server. Please try again.');
      } else {
        seterrorapi(error.message || 'An unexpected error occurred.');
      }
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <TitleBar role="Employee" />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          '& .MuiTextField-root': {
            m: 1,
            width: {
              xs: '90%', // 90% width on extra small screens
              sm: '80%', // 80% width on small screens
              md: '60ch' // 60ch on medium and up
            }
          }
        }}
        autoComplete="off"
      >
        <Typography align="center" sx={{ fontSize: '30px', padding: '10px' , color:"#005858", fontWeight:"700"}}>
          Place Your Order!
        </Typography>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <TextField
            required
            id="order_name"
            label="Name"
            name="order_name"
            value={formData.order_name}
            onChange={handleInputChange}
          />
          <TextField
            required
            id="unit_price"
            label="Price"
            type="number"
            name="unit_price"
            value={formData.unit_price}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true
            }}
          />
<TextField
  required
  id="quantity"
  label="Quantity"
  type="number"
  name="quantity"
  value={formData.quantity}
  onChange={handleInputChange}
  onInput={(e) => {
    const input = e.target as HTMLInputElement;  // Cast to HTMLInputElement
    input.value = input.value.replace(/[^0-9]/g, '');  // Remove non-numeric characters
  }}
  InputLabelProps={{
    shrink: true,
  }}
  inputProps={{
    min: 0,  // Optional: prevent negative values
  }}
/>
          <TextField
            required          
            id="link"
            label="Link"
            name="link"
            placeholder="https://www.amazon.com/..."
            value={formData.link}
            onChange={handleInputChange}
            helperText="Enter the link of your product"
          />
          <TextField
            required
            id="order_desc"
            label="Description"
            name="order_desc"
            placeholder="Please enter text"
            value={formData.order_desc}
            onChange={handleInputChange}
            helperText="Enter some information about your order"
            multiline
            rows={4}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isFormValid()}
            sx={{ mt: 2, width: { xs: '90%', sm: '80%', md: '30%' } }}
          >
            {loading ? 'Loading...' : 'Submit'}
          </Button>
          {submitted && (
            <Typography variant="body1" color="primary">
              Form submitted successfully!
            </Typography>
          )}
          {errorapi && (
            <Typography variant="body1" color="red">
              {errorapi}
            </Typography>
          )}
        </div>
      </Box>
    </>
  );
}
