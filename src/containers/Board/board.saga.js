import { takeLatest, call, put, select } from 'redux-saga/effects';
import { getPostsSuccess, getPostsFailure, postPostsFailure, postPostsSuccess, getPostsAction } from './board.actions';
import { GET_POSTS_REQUEST, POST_POSTS_REQUEST, ON_CHANGE_CHECKBOX, ON_CHANGE_ATTACHMENT } from './board.constants';
import { getPostsAPI, postPostsAPI, putPostsAPI } from './board.api';
import {
  makeSelectTitle,
  makeSelectDescription,
  makeSelectAttachment,
  makeSelectPostsById,
  makeSelectAttachmentId,
} from './board.selectors';

export function* getPostsSaga() {
  try {
    const postList = yield call(getPostsAPI);
    yield put(getPostsSuccess(postList));
  } catch (error) {
    yield put(getPostsFailure(error));
  }
}

export function* postPostsSaga() {
  const title = yield select(makeSelectTitle());
  const description = yield select(makeSelectDescription());
  const attachment = yield select(makeSelectAttachment());

  try {
    yield call(postPostsAPI, { title, description, attachment: attachment[0] });
    yield put(postPostsSuccess());
    yield put(getPostsAction());
  } catch (error) {
    yield put(postPostsFailure(error));
  }
}

export function* postPostsCheckboxSaga({ payload: id }) {
  console.log('postPostsCheckboxSaga>>>>', id);
  let post = yield select(makeSelectPostsById(id));
  console.log('postPostsCheckboxSaga>>>>', post);

  const { title, description, checkbox } = post;
  try {
    yield call(putPostsAPI, { id, title, description, checkbox: !checkbox });
    yield put(postPostsSuccess());
    yield put(getPostsAction());
  } catch (error) {
    yield put(postPostsFailure(error));
  }
}

export function* postPostsAttachmentSaga() {
  const attachment = yield select(makeSelectAttachment());
  const id = yield select(makeSelectAttachmentId());
  const post = yield select(makeSelectPostsById(id));
  console.log('postPostsCheckboxSaga>>>>', id, attachment, post);

  try {
    yield call(putPostsAPI, { ...post, attachment: attachment[0] });
    yield put(postPostsSuccess());
    yield put(getPostsAction());
  } catch (error) {
    yield put(postPostsFailure(error));
  }
}

export default function* boardSaga() {
  yield takeLatest(GET_POSTS_REQUEST, getPostsSaga);
  yield takeLatest(POST_POSTS_REQUEST, postPostsSaga);
  yield takeLatest(ON_CHANGE_CHECKBOX, postPostsCheckboxSaga);
  yield takeLatest(ON_CHANGE_ATTACHMENT, postPostsAttachmentSaga);
}
