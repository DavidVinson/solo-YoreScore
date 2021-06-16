import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';



// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Games played...players paid');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <center>
      <Container className="container">

        <Row>
          <Col>

            <Image src="https://i.imgur.com/fUrRsKwt.jpg" roundedCircle />
          </Col>
        </Row>
        <br/>
        <Row className="tag-line">
          <Col>
            <h5>Track points and get rewarded!</h5>
          </Col>
        </Row>

        <Row>
          <Col>
            <RegisterForm />
            <div className="formPanel">
              <h5>Already a Member?</h5>
              <Button className="btn_sizeMin" size="sm" onClick={onLogin}>
                Login
          </Button>
            </div>

          </Col>
        </Row>
      </Container>
    </center>
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
