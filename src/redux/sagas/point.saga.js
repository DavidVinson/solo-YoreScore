import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "ASSIGN_POINT" actions
function* assignPoint(action) {
    try {
        //going to point store
        yield put({ type: 'SET_POINT', payload: action.payload });

    } catch (error) {
        console.log('SET POINT to point store failed', error);
    }
}


function* pointSaga() {
    yield takeLatest('ASSIGN_POINT', assignPoint);
}


export default pointSaga;
