import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "CLEAR_POINTS_STORE" actions
function* clearPoints() {
    try {
        //clear point store
        yield put({ type: 'CLEAR_POINT' });

    } catch (error) {
        console.log('Clear points store failed', error);
    }
}

// function* fetchPoints(action) {
//     try {
//       //get call to api/game/point
//       const response = yield axios.get('/api/game/point', action.payload);
//       console.log('GET points from db', response.data);
//       //SET_PLAYER_POINTS is payout reducer
//       yield put({ type: 'SET_PLAYER_POINTS', payload: response.data });

//     } catch (error) {
//       console.log('Get points request failed', error);
//     }
//   }


function* pointSaga() {
    yield takeLatest('CLEAR_POINTS_STORE', clearPoints);
    // yield takeLatest('FETCH_POINTS', fetchPoints);
}


export default pointSaga;

