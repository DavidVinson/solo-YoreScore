import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
import './UserPage.css';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM

  const user = useSelector((store) => store.user);
  const myGames = useSelector((store) => store.game);
  // console.log('My Games on user page', myGames);
  const history = useHistory();
  const dispatch = useDispatch();


  if (myGames.length > 0) {
    return (
      <>
        <center>
          <Row className="start">
            <Col>
              <h2>Hey, {user.username}!</h2>
            </Col>
          </Row>
          <Row className="start">
            <Col>

              <h4>{myGames[0].course}...in progress</h4>
              <Button onClick={() => history.push('/roundPage')}>Continue Game</Button>

            </Col>
          </Row>
          <Row className="start">
            <Col>
              <LogOutButton className="btn" />
            </Col>
          </Row>
        </center>
      </>
    );
  }

  else {
    return (
      <>
        <center>
          <Row className="start">
            <Col>
              <h2>Welcome, {user.username}!</h2>
              <p></p>
            </Col>
          </Row>
          <Row className="start">
            <Col>
              <Button onClick={() => history.push('/gamePage')}>Start New Game</Button>
            </Col>
          </Row>
          <Row className="start">
            <Col>
              <LogOutButton className="btn" />
            </Col>
          </Row>
        </center>
      </>
    );
  }
}

// this allows us to use <App /> in index.js
export default UserPage;
