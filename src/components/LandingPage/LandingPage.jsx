import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
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
    <>

        <Row>
          <Col>

            <Image src="https://i.imgur.com/fUrRsKwt.jpg" roundedCircle />
          </Col>
        </Row>
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
    </>
  );



}

export default LandingPage;