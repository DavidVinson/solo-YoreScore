import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <Form onSubmit={registerUser}>
      <h5>Register Player</h5>
      {errors.registrationMessage && (
        <h4 className="alert" role="alert">
          {errors.registrationMessage}
        </h4>
      )}
      
        <Form.Group controlId="username">
        <Form.Label>
        
        <Form.Control placeholder="username"
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
            />
        </Form.Label>
        </Form.Group>
     
      <Form.Group controlId="password">
        <Form.Label>
       
        <Form.Control placeholder="password"
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
            />
        </Form.Label>
        </Form.Group>
        
        <Button className="btn" type="submit" name="submit" value="Register">Submit</Button> 
    </Form>
    
  );
}


export default RegisterForm;

