import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

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

  const store = useSelector((store) => store);
  console.log('my store ??', store);
  const points = useSelector((store) => store.point);
  const [heading, setHeading] = useState('');


  console.log('game round from store', currentGame.current_round);
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
      bingo: points.bingo, //player name //...points
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
      // to clear redux point store
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

    history.push('/roundPage');
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
      // to clear redux point store
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

    history.push('/points');

  }

  if (!currentGame) {
    return (
      <p>Loading...</p>
    );
  }

  else if (currentGame.current_round === 9) {
    return (
      <div>
        <p>Hole {currentGame.hole_number}</p>
        <h2 onClick={assignBingo}>Bingo!</h2>
        <h2 onClick={assignBango}>Bango!</h2>
        <h2 onClick={assignBongo}>Bongo!</h2>
        {(points.bingo !== '' && points.bongo !== '' && points.bango !== '') && <button onClick={gameOver}>Game Over</button>}
      </div>
    );
  }

  else {
    return (
      <div>
        <p>Hole {currentGame.hole_number}</p>
        <h2 onClick={assignBingo}>Bingo!</h2>
        <h2 onClick={assignBango}>Bango!</h2>
        <h2 onClick={assignBongo}>Bongo!</h2>
        {(points.bingo !== '' && points.bongo !== '' && points.bango !== '') && <button onClick={nextHole}>Next Hole</button>}
      </div>
    );
  }
}

export default RoundPage;