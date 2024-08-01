import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: ''
  });

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const signupHandler = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        username: inputs.username,
        password: inputs.password,
        role: 'user', // Adjust according to your requirements
      });

      if (response.status === 201) {
        navigate('/login'); // Navigate to login page on successful sign-up
      }
    } catch (error) {
      console.error('Error during sign-up:', error.response?.data);
    }
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginTop: '10%' }}>
        <Typography variant='h3' style={{ fontFamily: 'times' }}>Sign Up</Typography>
        <br /><br />
        <TextField 
          variant='outlined' 
          label='Username' 
          name='username'
          value={inputs.username}
          onChange={inputHandler}
        />
        <br /><br />
        <TextField 
          variant='outlined' 
          label='Email' 
          name='email'
          value={inputs.email}
          onChange={inputHandler}
        />
        <br /><br />
        <TextField 
          variant='outlined' 
          label='Password' 
          name='password'
          type='password'
          value={inputs.password}
          onChange={inputHandler}
        />
        <br /><br />
        <Button 
          variant='contained' 
          onClick={signupHandler}  
          style={{ backgroundColor: '#183e4b', fontFamily: 'times', borderRadius: '2rem' }}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
