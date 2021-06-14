import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "START_GAME" actions
function* startGame(action) {
    try {
      yield axios.post('/api/game/start', action.payload);
      //after new game started, CLEAR point and score reducers
      yield put({type: 'CLEAR_POINT'});
      yield put({type: 'CLEAR_SCORE'});

    } catch (error) {
      console.log('Start Game post request failed', error);
    }
  }

  function* fetchGameRound() {
    try {
      //response will be an array of game rounds
      const response = yield axios.get('/api/game');
      console.log('GET game round from db', response.data);
      //SET_GAME_ROUND in game reducer
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

  function* fetchAllGames() {
    try {
      //GET ALL games from the db
      const response = yield axios.get('/api/game/all');
      console.log('GET all games from db', response.data);
      //SET_ALL_GAMES is allgame reducer
      yield put({ type: 'SET_ALL_GAMES', payload: response.data });

    } catch (error) {
      console.log('Get all games request failed', error);
    }
  }

  function* endGame(action) {
    console.log('what is the action', action.payload);
    try {
      //updates game table to end game status
      yield axios.put('/api/game/end', action.payload);
      //CLEAR_POINT clears points from point reducer
      yield put({ type: 'CLEAR_POINT' });

    } catch (error) {
      console.log('End game request failed', error);
    }
  }

  function* deleteGame(action) {
    try {
      console.log('the delete game payload', action.payload);
      yield axios.delete(`/api/game/delete/${action.payload}`);
      //FETCH_ALL_GAMES in game saga
      yield put({ type: 'FETCH_ALL_GAMES' });

    } catch (error) {
      console.log('Delete game request failed', error);
    }
  }


  function* fetchYoreScore(action) {
      try {
        //GET the score for the game
        console.log('the get score action', action.payload);

        const response = yield axios.get(`/api/game/score/${action.payload}`);
        console.log('YoreScore!', response.data);
        //SET_YORE_SCORE in score reducer
        yield put({ type: 'SET_YORE_SCORE', payload: response.data });
  
      } catch (error) {
        console.log('YoreScore game request failed', error);
      }
  }

  
  function* gameSaga() {
    yield takeLatest('START_GAME', startGame);
    yield takeLatest('FETCH_GAME_ROUND', fetchGameRound);
    yield takeLatest('SET_NEXT_ROUND', nextRound);
    yield takeLatest('FETCH_ALL_GAMES', fetchAllGames);
    yield takeLatest('DELETE_GAME', deleteGame);
    yield takeLatest('END_GAME', endGame);
    yield takeLatest('FETCH_YORE_SCORE', fetchYoreScore);
  }
  

export default gameSaga;
