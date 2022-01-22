import {
  GET_POSTS_REQUEST,
  GET_POSTS_FAILURE,
  GET_POSTS_SUCCESS,
  POST_POSTS_REQUEST,
  POST_POSTS_SUCCESS,
  POST_POSTS_FAILURE,
  HANDLE_MODAL_SHOW,
  HANDLE_MODAL_CANCEL,
  ON_CHANGE_TITLE,
  ON_CHANGE_DESCRIPTION,
  ON_CHANGE_ADD_ATTACHMENT,
  ON_CHANGE_DEL_ATTACHMENT,
  ON_CHANGE_CHECKBOX,
  ON_CHANGE_ATTACHMENT,
  HANDLE_ATTACHMENT_MODAL_SHOW,
  HANDLE_ATTACHMENT_MODAL_CANCEL,
 
} from './board.constants';

export const getPostsAction = payload => ({ type: GET_POSTS_REQUEST, payload });
export const getPostsSuccess = payload => ({ type: GET_POSTS_SUCCESS, payload });
export const getPostsFailure = payload => ({ type: GET_POSTS_FAILURE, payload });

export const postPostsAction = payload => ({ type: POST_POSTS_REQUEST, payload });
export const postPostsSuccess = payload => ({ type: POST_POSTS_SUCCESS, payload });
export const postPostsFailure = payload => ({ type: POST_POSTS_FAILURE, payload });

export const handleModalShowAction = payload => ({ type: HANDLE_MODAL_SHOW, payload });
export const handleModalCancelAction = payload => ({ type: HANDLE_MODAL_CANCEL, payload });

export const onChangeTitleAction = payload => ({ type: ON_CHANGE_TITLE, payload });
export const onChangeDescriptionAction = payload => ({ type: ON_CHANGE_DESCRIPTION, payload });
export const onChangeAddAttachmentAction = payload => ({ type: ON_CHANGE_ADD_ATTACHMENT, payload });
export const onChangeDelAttachmentAction = payload => ({ type: ON_CHANGE_DEL_ATTACHMENT, payload });

export const onChangeCheckboxAction =  payload => ({ type: ON_CHANGE_CHECKBOX, payload });

export const handleAttachmentModalShowAction = payload => ({ type: HANDLE_ATTACHMENT_MODAL_SHOW, payload });
export const handleAttachmentModalCancelAction = payload => ({ type: HANDLE_ATTACHMENT_MODAL_CANCEL, payload });


export const putPostsWithAttachment =  payload => ({ type: ON_CHANGE_ATTACHMENT, payload });