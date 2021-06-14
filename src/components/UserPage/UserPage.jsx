import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM

  const user = useSelector((store) => store.user);
  const myGames = useSelector((store) => store.game);
  console.log('My Games on user page', myGames);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'FETCH_GAME_ROUND'})
  }, [])

  if (myGames) {
    return (
      <div className="container">
        <h2>Welcome, {user.username}!</h2>
        <p>Your ID is: {user.id}</p>
        <LogOutButton className="btn" />
        <button onClick={() => history.push('/gamePage')}>Start New Game</button>
        {myGames && <button onClick={() => history.push('/roundPage')}>Continue Game</button>}
      </div>

    );
  }

  else {

    return (
      <div className="container">
        <h2>Welcome, {user.username}!</h2>
        <p>Your ID is: {user.id}</p>
        <LogOutButton className="btn" />
        <button onClick={() => history.push('/gamePage')}>Start New Game</button>
        {/* {myGames && <button onClick={() => history.push('/roundPage')}>Continue Game</button>} */}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default UserPage;
