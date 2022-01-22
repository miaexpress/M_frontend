import { takeLatest, call, put, select } from 'redux-saga/effects';
import { getUsersSuccess, getUsersFailure, addUsersFailure, addUsersSuccess, addUsersAction, getUsersAction, modifyUsersSuccess, modifyUsersFailure } from './users.actions';
import { GET_USERS_REQUEST, ADD_USERS_REQUEST, MODIFY_USERS_REQUEST } from './users.constants';
import { getUsersAPI, postUsersAPI, putUsersAPI } from './users.api';
import {
  makeSelectAccountId,
  makeSelectName,
  makeSelectEmail,
  makeSelectPassword,
  makeSelectUsersById,
} from './users.selectors';

export function* getUsersSaga() {
  try {
    const usersList = yield call(getUsersAPI);
    yield put(getUsersSuccess(usersList));
  } catch (error) {
    yield put(getUsersFailure(error));
  }
}

export function* postUsersSaga() {
  const accountId = yield select(makeSelectAccountId);
  const name = yield select(makeSelectName);
  const email = yield select(makeSelectEmail);
  const password = yield select(makeSelectPassword);
  
  //TODO: update to dynamic value
  const createdBy = 1;
  const permissions = 'user';

  try {
    yield call(postUsersAPI, { accountId, name, email, password,createdBy, permissions });
    yield put(addUsersSuccess());
    yield put(getUsersAction());
  } catch (error) {
    yield put(addUsersFailure(error));
  }
}

export function* putUsersSaga({ payload: id }) {
  const accountId = yield select(makeSelectAccountId);
  const name = yield select(makeSelectName);
  const email = yield select(makeSelectEmail);
  const password = yield select(makeSelectPassword);

  try {
    yield call(putUsersAPI, { id, accountId, name, email, password });
    yield put(modifyUsersSuccess());
    yield put(getUsersAction());
  } catch (error) {
    yield put(modifyUsersFailure(error));
  }
}

export default function* usersSaga() {
  yield takeLatest(GET_USERS_REQUEST, getUsersSaga);
  yield takeLatest(ADD_USERS_REQUEST, postUsersSaga);
  yield takeLatest(MODIFY_USERS_REQUEST, putUsersSaga);
}
