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
    <Form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      
        <Form.Group controlId="username">
        <Form.Label>
        Username:
        <Form.Control
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
        Password:
        <Form.Control
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

/*
THE ORIGINAL FORM FROM TEMPLATE
  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

*/
