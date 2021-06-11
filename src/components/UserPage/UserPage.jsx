import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useEffect} from 'react';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM

  const user = useSelector((store) => store.user);
  const currentGameRounds = useSelector((store) => store.game);
  const history = useHistory();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch({
  //     //axios GET call to game saga
  //     //gets games with game_status = 1
  //     type: 'FETCH_GAME_ROUND'
  //   })
  // }, [])


  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
      <button onClick={() => history.push('/gamePage')}>Start New Game</button>
      <button onClick={() => history.push('/roundPage')}>Continue Game</button>

    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
