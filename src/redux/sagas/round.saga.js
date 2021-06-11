import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "SEND_POINTS" actions
// worker Saga: will be fired on "SET_NEXT_HOLE" actions

function* sendPoints(action) {
    try {
        yield axios.put('/api/round', action.payload);

    } catch (error) {
        console.log('Send points post request failed', error);
    }
}


function* nextHole(action) {
    console.log('what is the action', action.payload);

    try {
        yield axios.post('/api/round', action.payload);

    } catch (error) {
        console.log('Post new hole request failed', error);
    }
}

function* roundSaga() {
    yield takeLatest('SEND_POINTS', sendPoints);
    yield takeLatest('SET_NEXT_HOLE', nextHole);
}


export default roundSaga;
