import React, { useState } from 'react';
import { Form, Button,Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { login, logout, getAuthState } from './Auth';

const RegisterLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const isLoggedIn = getAuthState();
   // Change from useHistory to useNavigate

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:4000/users/register', { username, password, role: 'user' });
      console.log('Registration successful');
      setMessage('Registration successful as Customer');
    } catch (error) {
      console.error('Error registering user:', error);
      setMessage('Registration failed Try with another username');
      
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/users/login', { username, password}, { withCredentials: true });
      console.log('Login successful', response.data);
      login();
      navigate('/profile');  // Use navigate instead of history.push
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage('Login failed');
    }
  };
 
  return (
    <><div className="container mt-5">
      <h2> User Register/Login</h2>
      {message && <Alert variant={message.includes('successful') ? 'success' : 'danger'}>{message}</Alert>}
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Button variant="primary" className="m-4" onClick={handleRegister}>
          Register
        </Button>
        <Button variant="success" className="m-4" onClick={handleLogin}>
          Login
        </Button>

      </Form>
      
    </div></>
  );
};

export default RegisterLogin;
