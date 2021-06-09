import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "FETCH_USER" actions
function* startGame(action) {
    try {
  
      yield axios.post('/api/game/start', action.payload);
  
      // now that the session has given us a user object
      // with an id and username set the client-side user object to let
      // the client-side code know the user is logged in
    } catch (error) {
      console.log('Start Game post request failed', error);
    }
  }
  
  function* gameSaga() {
    yield takeLatest('START_GAME', startGame);
  }
  

export default gameSaga;
