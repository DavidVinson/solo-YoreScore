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

  function* fetchGame() {
    try {
      const response = yield axios.get('/api/game/current');
      yield put({ type: 'SET_CURRENT_GAME', payload: response.data });

    } catch (error) {
      console.log('Get current game request failed', error);
    }
  }
  

  function* gameSaga() {
    yield takeLatest('START_GAME', startGame);
    yield takeLatest('FETCH_CURRENT_GAME', fetchGame);
  }
  

export default gameSaga;
