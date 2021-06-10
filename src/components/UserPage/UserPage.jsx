import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useEffect, useState} from 'react';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM

  const user = useSelector((store) => store.user);
  const currentGame = useSelector((store) => store.game);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'FETCH_CURRENT_GAME'
    })
  }, [])

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
      <button onClick={() => history.push('/gamePage')}>Start New Game</button>
      {currentGame.length === 1 && <button onClick={() => history.push('/roundPage')}>Current Game</button>}

    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
