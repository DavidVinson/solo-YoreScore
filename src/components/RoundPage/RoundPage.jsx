import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function RoundPage(props) {

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({type: 'FETCH_GAME_ROUND'})
  }, [])

  //currentGame will be an array of game rounds
  const currentGame = useSelector((store) => store.game);
  const points = useSelector((store) => store.point);
  const [heading, setHeading] = useState('');


  // console.log('game round from store', currentGame);
  // console.log('game round from store', currentGame[currentGame.length - 1].hole_number);
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

  function nextHole(currentGame, points) {
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

    let pointObj = {
      game_id: currentGame[currentGame.length - 1].game_id,
      hole_number: currentGame[currentGame.length - 1].hole_number,
      bingo: points[0].bingo,
      bango: points[1].bango,
      bongo: points[2].bongo
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
      // to clear redux point store
      type: 'CLEAR_POINTS_STORE'
    })
    dispatch({
      //axios PUT to api/game to the game saga
      //updates current round in game table by 1
      type: 'SET_NEXT_ROUND',
      payload: {
        user_id: currentGame[currentGame.length - 1].user_id,
        game_id: currentGame[currentGame.length - 1].game_id
      }
    })
    dispatch({
      //axios POST to api/round to the round saga.
      //creates new record in round table
      type: 'SET_NEXT_HOLE',
      payload: {
        game_id: currentGame[currentGame.length - 1].game_id,
        hole_number: currentGame[currentGame.length - 1].hole_number
      }
    })
    // dispatch({
    //   //axios GET to api/game to game saga
    //   //gets the current game and round info
    //   type: 'FETCH_GAME_ROUND'
    // })
    history.push('/points');
  }

  return (
    <div>
      <h2>Hole {currentGame[currentGame.length - 1].hole_number}</h2>
      <h2 onClick={assignBingo}>Bingo!</h2>
      <h2 onClick={assignBango}>Bango!</h2>
      <h2 onClick={assignBongo}>Bongo!</h2>
      {points.length === 3 && <button onClick={() => nextHole(currentGame, points)}>Next Hole</button>}

    </div>
  );
}

export default RoundPage;

/*


  if (!points) {
    return (
      <div>
        <h2>{heading}</h2>
        <h2 onClick={assignBingo}>Bingo!</h2>
        <h2 onClick={assignBango}>Bango!</h2>
        <h2 onClick={assignBongo}>Bongo!</h2>
      </div>
    );
  }
  else {
    return (
      <div>
        <h2>{heading}</h2>
        {points ? <h2 onClick={assignBingo}>Bingo!</h2> : <h2>Bingo! {bingoPoint}</h2>}
        {points ? <h2 onClick={assignBango}>Bango!</h2> : <h2>Bango! {bangoPoint}</h2>}
        {points ? <h2 onClick={assignBongo}>Bongo!</h2> : <h2>Bongo! {bongoPoint}</h2>}
        {points.length === 3 && <button>Next Hole</button>}

      </div>
    );

  }


*/