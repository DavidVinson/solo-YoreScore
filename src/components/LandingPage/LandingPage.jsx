import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Games played...players paid');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>{heading}</h2></Col>
      </Row>
      <Row>
        <Col>
          <p>Yore Score tracks the points awarded for each player during a game of Bingo, Bango, Bongo.
            Point totals and payout have never been easier! Never forget who won with Yore Score!</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <RegisterForm />
          <center>
          <h4>Already a Member?</h4>
          <Button size="sm" onClick={onLogin}>
            Login
          </Button>
          </center>
        </Col>
      </Row>

    </Container>
  );


}

export default LandingPage;

/*
ORIGINAL
  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <h3>Never forget who won...remind them with Yore Score!</h3>
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
*/
