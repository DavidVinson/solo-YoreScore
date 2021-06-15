import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM

  const user = useSelector((store) => store.user);
  const myGames = useSelector((store) => store.game);
  console.log('My Games on user page', myGames);
  const history = useHistory();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch({type: 'FETCH_GAME_ROUND'})
  // }, [])

  if (myGames.length > 0) {
    return (
      <Container>
        <Row>
          <Col>
            <h2>Welcome, {user.username}!</h2>
            {/* <p>Your ID is: {user.id}</p> */}
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={() => history.push('/gamePage')}>Start New Game</Button>
            <Button onClick={() => history.push('/roundPage')}>Continue Game</Button>
          </Col>
        </Row>
        <Row>
          <Col>
          <LogOutButton className="btn" />
          </Col>
        </Row>

      </Container>

    );
  }

  else {
    return (
      <Container>
        <Row>
          <Col>
          <h2>Welcome, {user.username}!</h2>
        {/* <p>Your ID is: {user.id}</p> */}
          </Col>
        </Row>
        <Row>
          <Col>
          <Button onClick={() => history.push('/gamePage')}>Start New Game</Button>
          </Col>
        </Row>
        <Row>
          <Col>
          <LogOutButton className="btn" />
          </Col>
        </Row>
      </Container>
    );
  }
}

// this allows us to use <App /> in index.js
export default UserPage;
