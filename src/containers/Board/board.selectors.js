import { createSelector } from 'reselect';
import { find, sortBy } from 'lodash';
import { initialState } from './board.reducer';

const selectBoardDomain = state => state.board || initialState;

const selectPostList = createSelector(selectBoardDomain, substate => {
  return sortBy(substate.postList, ['id']);
});

const selectModalVisible = createSelector(selectBoardDomain, substate => substate.modalVisible);
const selectModalLoading = createSelector(selectBoardDomain, substate => substate.modalLoading);

const selectAttachmentModalVisible = createSelector(selectBoardDomain, substate => substate.attachmentModalVisible);
const selectAttachmentModalLoading = createSelector(selectBoardDomain, substate => substate.attachmentModalLoading);

const makeSelectCheckbox = () => createSelector(selectBoardDomain, substate => substate.postForm.checkbox);
const makeSelectTitle = () => createSelector(selectBoardDomain, substate => substate.postForm.title);
const makeSelectDescription = () => createSelector(selectBoardDomain, substate => substate.postForm.description);

const makeSelectAttachment = () => createSelector(selectBoardDomain, substate => substate.postForm.attachment);

const makeSelectPostsById = id =>
  createSelector(selectPostList, postList => {
    return find(postList, { id: id });
  });

const makeSelectAttachmentId = () => createSelector(selectBoardDomain, substate => substate.postForm.id);


export {
  selectBoardDomain,
  selectPostList,
  selectModalVisible,
  selectModalLoading,
  selectAttachmentModalVisible,
  selectAttachmentModalLoading,
  makeSelectCheckbox,
  makeSelectTitle,
  makeSelectDescription,
  makeSelectAttachment,
  makeSelectPostsById,
  makeSelectAttachmentId,
};
