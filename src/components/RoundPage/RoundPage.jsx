import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

function RoundPage(props) {

  const currentGame = useSelector((store) => store.game);
  // const currentHole = currentGame[0].hole_number;
  const points = useSelector((store) => store.point);

  const [heading, setHeading] = useState(`Hole ??`);
  const [bingoPoint, setBingoPoint] = useState('');
  const [bangoPoint, setBangoPoint] = useState('');
  const [bongoPoint, setBongoPoint] = useState('');
 
  const dispatch = useDispatch();
  const history = useHistory();

  console.log('current game store', currentGame);
  console.log('current points in store', points);


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
    console.log('next hole');
    //dispatch points to db
    //dispatch game to next round
    //reset points store to empty
    //reset round page
    //
    
  }
  
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