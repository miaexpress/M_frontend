import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  getZonesSuccess,
  getZonesFailure,
  addZonesFailure,
  addZonesSuccess,
  addZonesAction,
  getZonesAction,
  modifyZonesSuccess,
  modifyZonesFailure,
} from './zones.actions';
import { GET_ZONES_REQUEST, ADD_ZONES_REQUEST, MODIFY_ZONES_REQUEST } from './zones.constants';
import { getZonesAPI, postZonesAPI, putZonesAPI } from './zones.api';
import { makeSelectTitle, makeSelectDescription, makeSelectPoints } from './zones.selectors';

export function* getZonesSaga() {
  try {
    const zonesList = yield call(getZonesAPI);
    yield put(getZonesSuccess(zonesList));
  } catch (error) {
    yield put(getZonesFailure(error));
  }
}

export function* postZonesSaga() {
  const title = yield select(makeSelectTitle);
  const description = yield select(makeSelectDescription);
  const points = yield select(makeSelectPoints);

  try {
    yield call(postZonesAPI, { title, description, points });
    yield put(addZonesSuccess());
    yield put(getZonesAction());
  } catch (error) {
    yield put(addZonesFailure(error));
  }
}

export function* putZonesSaga({ payload: id }) {
  const title = yield select(makeSelectTitle);
  const description = yield select(makeSelectDescription);
  const points = yield select(makeSelectPoints);

  try {
    yield call(putZonesAPI, { title, description, points });
    yield put(modifyZonesSuccess());
    yield put(getZonesAction());
  } catch (error) {
    yield put(modifyZonesFailure(error));
  }
}

export default function* usersSaga() {
  yield takeLatest(GET_ZONES_REQUEST, getZonesSaga);
  yield takeLatest(ADD_ZONES_REQUEST, postZonesSaga);
  yield takeLatest(MODIFY_ZONES_REQUEST, putZonesSaga);
}
