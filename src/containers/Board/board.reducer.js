import produce from 'immer';
import { find } from 'lodash';
import {
  GET_POSTS_SUCCESS,
  HANDLE_MODAL_SHOW,
  HANDLE_MODAL_CANCEL,
  POST_POSTS_REQUEST,
  POST_POSTS_SUCCESS,
  POST_POSTS_FAILURE,
  ON_CHANGE_DESCRIPTION,
  ON_CHANGE_TITLE,
  ON_CHANGE_ADD_ATTACHMENT,
  ON_CHANGE_DEL_ATTACHMENT,
  HANDLE_ATTACHMENT_MODAL_SHOW,
  HANDLE_ATTACHMENT_MODAL_CANCEL,
} from './board.constants';

export const initialState = {
  postList: [],
  modalVisible: false,
  modalLoading: false,
  attachmentModalVisible: false,
  attachmentModalLoading: false,
  postForm: {
    title: '',
    text: '',
    attachment: [],
  },
};

/* eslint-disable default-case, no-param-reassign */
const boardReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_POSTS_SUCCESS:
        draft.postList = action.payload.data;
        break;
      case POST_POSTS_REQUEST:
        draft.modalLoading = true;
        break;
      case POST_POSTS_SUCCESS:
        draft.modalLoading = false;
        draft.modalVisible = false;
        draft.attachmentModalVisible = false;
        draft.attachmentModalLoading = false;
        draft.postForm = {
          title: '',
          text: '',
          attachment: [],
        };
        break;
      case POST_POSTS_FAILURE:
        draft.modalLoading = false;
        break;
      case HANDLE_MODAL_SHOW:
        draft.modalVisible = true;
        break;
      case HANDLE_MODAL_CANCEL:
        draft.modalLoading = false;
        draft.modalVisible = false;
        break;
      case ON_CHANGE_TITLE:
        draft.postForm.title = action.payload;
        break;
      case ON_CHANGE_DESCRIPTION:
        draft.postForm.description = action.payload;
        break;
      case ON_CHANGE_ADD_ATTACHMENT:
        draft.postForm.attachment = [action.payload];
        break;
      case ON_CHANGE_DEL_ATTACHMENT:
        draft.postForm.attachment = [];
        break;

      case HANDLE_ATTACHMENT_MODAL_SHOW:
        console.log('HANDLE_ATTACHMENT_MODAL_SHOW', action.payload);
        draft.postForm.id = action.payload;
        draft.attachmentModalVisible = true;
        break;
      case HANDLE_ATTACHMENT_MODAL_CANCEL:
        draft.attachmentModalLoading = false;
        draft.attachmentModalVisible = false;
        draft.postForm.attachment = [];
        draft.postForm.id = '';
        break;
    }
  });

export default boardReducer;
