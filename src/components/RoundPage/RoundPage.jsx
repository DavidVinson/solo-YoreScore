import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

function RoundPage(props) {

  const currentGame = useSelector((store) => store.game);
  const [heading, setHeading] = useState('Round Page Component');

  // const [bingo, setBingo] = useState('bingo');
  // const [bango, setBango] = useState('bango');
  // const [bongo, setBongo] = useState('bongo');

  const dispatch = useDispatch();
  const history = useHistory();

  console.log('current game store', currentGame);


  useEffect(() => {
    dispatch({
      type: 'FETCH_CURRENT_GAME'
    })
  }, [])

  function assignBingo() {
    // navigate to PointAssignPage
    history.push('/bingo');
  }

  function assignBango() {
    // navigate to PointAssignPage
    history.push('/bango');
  }

  function assignBongo() {
    // navigate to PointAssignPage
    history.push('/bongo');

  }

  return (
    <div>
      <h2>{heading}</h2>
      <h2 onClick={assignBingo}>Bingo!</h2>
      <h2 onClick={assignBango}>Bango!</h2>
      <h2 onClick={assignBongo}>Bongo!</h2>

    </div>
  );
}

export default RoundPage;

/*
{
  "game_id": "8", //current game
  "hole_number": "2", //current hole
  "bingo": "Quin",  // player won bingo
  "bango": "Tanner", // player won bango
  "bongo": "Quin" // player won bongo
}

*/