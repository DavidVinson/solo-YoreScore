import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';


function RoundPage(props) {

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_GAME_ROUND' })
  }, [])

  //currentGame will be an array of game rounds
  //the currentGame should be in game reducer when game was created
  const myGames = useSelector((store) => store.game);
  const currentGame = myGames[myGames.length - 1] || {}; // could be undefined

  const points = useSelector((store) => store.point);
  const [heading, setHeading] = useState('');


  // console.log('game round from store', currentGame.current_round);
  console.log('current points from store', points);


  function assignBingo() {
    // navigate to BingoPage
    history.push('/bingo');
  }

  function assignBango() {
    // navigate to BangoPage
    history.push('/bango');
  }

  function assignBongo() {
    // navigate to BongoPage
    history.push('/bongo');
  }

  function nextHole() {
    //[x]dispatch points to db
    //[x]reset points store to empty
    //[x]dispatch game to next round
    //[]reset round page by changing state

    /* what db is expecting for pointObj
    {
    "game_id": "8", //current game
    "hole_number": "2", //current hole
    "bingo": "Quin",  // player won bingo
    "bango": "Tanner", // player won bango
    "bongo": "Quin" // player won bongo
    }
    */

    // let pointsObj = {...currentGame, ...points };

    let pointObj = {
      game_id: currentGame.game_id,
      hole_number: currentGame.hole_number,
      bingo: points.bingo,
      bango: points.bango,
      bongo: points.bongo
    }

    console.log('point obj', pointObj);

    dispatch({
      //axios PUT to api/round to the round saga
      //updates current hold with player points
      type: 'SEND_POINTS',
      payload: pointObj
    })
    dispatch({
      //no axios call. dispatch to point saga
      // to clear redux point store (bingo, bango, bongo points)
      type: 'CLEAR_POINTS_STORE'
    })
    dispatch({
      //axios PUT to api/game to the game saga
      //updates current round in game table by 1
      type: 'SET_NEXT_ROUND',
      payload: {
        user_id: currentGame.user_id,
        game_id: currentGame.game_id
      }
    })
    dispatch({
      //axios POST to api/round to the round saga.
      //creates new record in round table
      type: 'SET_NEXT_HOLE',
      payload: {
        game_id: currentGame.game_id,
        hole_number: currentGame.hole_number
      }
    })
    dispatch({
      //axios GET to api/game to game saga
      //gets the current game and round info
      type: 'FETCH_GAME_ROUND'
    })

    dispatch({
      //get the score ready between holes
      type: 'FETCH_YORE_SCORE',
      payload: currentGame.game_id
    })

    history.push('/score');
  }


  function gameOver() {
    //update game table to game_state = 2 api/game/end
    //endpoint needs: game id, user id
    //navigate to points page
    console.log('player', currentGame.user_id);
    console.log('current game', currentGame.game_id);

    let pointObj = {
      game_id: currentGame.game_id,
      hole_number: currentGame.hole_number,
      bingo: points.bingo, //player name //...points
      bango: points.bango,
      bongo: points.bongo
    }

    dispatch({
      //axios PUT to api/round to the round saga
      //updates current hole with player points
      type: 'SEND_POINTS',
      payload: pointObj
    })

    dispatch({
      //no axios call. dispatch to point saga
      // to clear redux point store (bingo, bango, bongo points)
      type: 'CLEAR_POINTS_STORE'
    })

    dispatch({
      //axios PUT to api/game/end
      type: 'END_GAME',
      payload: {
        user_id: currentGame.user_id,
        game_id: currentGame.game_id,
      }
    })

    // dispatch({
    //   //get the score ready
    //   type: 'FETCH_YORE_SCORE',
    //   payload: currentGame.game_id
    // })

    //navigate to YoreScore page
    history.push('/score');

  }

  if (currentGame.length === 0) {
    return (
      <center>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </center>

    );
  }

  else if (currentGame.current_round === 3) {
    return (
      <center>
          <Row xs={12}>
            <Col>
            <Image src="https://i.imgur.com/fUrRsKwt.jpg" roundedCircle />
            <h1><Badge variant="dark">{currentGame.hole_number}</Badge></h1>
            </Col>
          </Row>
          <Row xs={12}>
            <Col>
              {points.bingo !== '' ? <h3><Badge variant="success">Bingo! {points.bingo}</Badge></h3> : <Button onClick={assignBingo}>Bingo!</Button>}
            </Col>
          </Row>
          <Row xs={12}>
            <Col>
              {points.bango !== '' ? <h3><Badge variant="success">Bango! {points.bango}</Badge></h3> : <Button onClick={assignBango}>Bango!</Button>}
            </Col>
          </Row>
          <Row xs={12}>
            <Col>
              {points.bongo !== '' ? <h3><Badge variant="success">Bongo! {points.bongo}</Badge></h3> : <Button onClick={assignBongo}>Bongo!</Button>}
            </Col>
          </Row>
          <Row xs={12}>
            <Col>
              {(points.bingo !== '' && points.bongo !== '' && points.bango !== '') && <Button onClick={gameOver}>Game Over</Button>}
            </Col>
          </Row>
      </center>
    );
  }

  else {
    return (
      <center>
          <Row xs={12}>
            <Col>
              <Image src="https://i.imgur.com/fUrRsKwt.jpg" roundedCircle />
              <h1><Badge variant="dark">{currentGame.hole_number}</Badge></h1>
            </Col>
          </Row>
          <Row xs={12}>
            <Col>
              {points.bingo !== '' ? <h3><Badge variant="success">Bingo! {points.bingo}</Badge></h3> : <Button onClick={assignBingo}>Bingo!</Button>}
            </Col>
          </Row>
          <Row xs={12}>
            <Col>
              {points.bango !== '' ? <h3><Badge variant="success">Bango! {points.bango}</Badge></h3> : <Button onClick={assignBango}>Bango!</Button>}
            </Col>
          </Row>
          <Row xs={12}>
            <Col>
              {points.bongo !== '' ? <h3><Badge variant="success">Bongo! {points.bongo}</Badge></h3> : <Button onClick={assignBongo}>Bongo!</Button>}
            </Col>
          </Row>
          <Row xs={12}>
            <Col>
              {(points.bingo !== '' && points.bongo !== '' && points.bango !== '') && <Button onClick={nextHole}>Ok</Button>}
            </Col>
          </Row>
      </center>
    );
  }
}

export default RoundPage;