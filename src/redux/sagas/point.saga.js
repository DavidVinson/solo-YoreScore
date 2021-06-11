import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "ASSIGN_POINT" actions
// point saga works only with redux point store
// there are no axios calls to database
function* assignPoint(action) {
    try {
        //going to point store
        yield put({ type: 'SET_POINT', payload: action.payload });

    } catch (error) {
        console.log('SET POINT to point store failed', error);
    }
}

function* clearPoints() {
    try {
        //clear point store
        yield put({ type: 'CLEAR_POINT' });

    } catch (error) {
        console.log('SET POINT to point store failed', error);
    }
}

function* fetchPoints(action) {
    try {
      //get call to api/game/point
      const response = yield axios.get('/api/game/point', action.payload);
      console.log('GET points from db', response.data);
      //SET_PLAYER_POINTS is payout reducer
      yield put({ type: 'SET_PLAYER_POINTS', payload: response.data });

    } catch (error) {
      console.log('Get points request failed', error);
    }
  }


function* pointSaga() {
    yield takeLatest('ASSIGN_POINT', assignPoint);
    yield takeLatest('CLEAR_POINTS_STORE', clearPoints);
    yield takeLatest('FETCH_POINTS', fetchPoints);
}


export default pointSaga;

