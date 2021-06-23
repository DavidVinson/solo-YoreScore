import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "CLEAR_POINTS_STORE" actions
function* clearPoints() {
    try {
        //clear point store
        yield put({ type: 'CLEAR_POINT' });

    } catch (error) {
        console.log('Clear points store failed', error);
    }
}

function* pointSaga() {
    yield takeLatest('CLEAR_POINTS_STORE', clearPoints);
}


export default pointSaga;

