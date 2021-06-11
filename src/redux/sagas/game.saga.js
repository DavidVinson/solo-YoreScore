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
      const response = yield axios.get('/api/game');
      console.log('GET data from db', response.data);
      //SET_GAME_ROUND is game reducer
      yield put({ type: 'SET_GAME_ROUND', payload: response.data });

    } catch (error) {
      console.log('Get current game request failed', error);
    }
  }

  function* nextRound(action) {
    console.log('what is the action', action.payload);
    try {
      yield axios.put('/api/game', action.payload);

    } catch (error) {
      console.log('Set game to next round request failed', error);
    }
  }
  

  function* gameSaga() {
    yield takeLatest('START_GAME', startGame);
    yield takeLatest('FETCH_GAME_ROUND', fetchGame);
    yield takeLatest('SET_NEXT_ROUND', nextRound);
  }
  

export default gameSaga;
