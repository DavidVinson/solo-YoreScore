import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <center>
    <Container className="formPanel">
    <Form onSubmit={login}>
      <h5>Login</h5>
      {errors.loginMessage && (
        <h4 className="alert" role="alert">
          {errors.loginMessage}
        </h4>
      )}
        <Form.Group>
          <Form.Label>
            <Form.Control placeholder="username"
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            />
        </Form.Label>
        </Form.Group>
      
        <Form.Group>
          <Form.Label>
            <Form.Control placeholder="password" 
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            />
        </Form.Label>
        </Form.Group>
     
      <Button className="btn" type="submit" name="submit" value="Log In">Submit</Button>

    </Form>
    </Container>
    </center>
  );
}

export default LoginForm;