import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "START_GAME" actions
function* startGame(action) {
    try {
      yield axios.post('/api/game/start', action.payload);

    } catch (error) {
      console.log('Start Game post request failed', error);
    }
  }
  

  function* gameSaga() {
    yield takeLatest('START_GAME', startGame);
  }
  

export default gameSaga;
