import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Button, Modal, Input, Icon, Upload } from 'antd';

import {
  selectModalVisible,
  selectModalLoading,
  makeSelectTitle,
  makeSelectDescription,
  makeSelectAttachment,
} from '../board.selectors';
import {
  handleModalCancelAction,
  postPostsAction,
  onChangeTitleAction,
  onChangeDescriptionAction,
  onChangeAddAttachmentAction,
  onChangeDelAttachmentAction,
} from '../board.actions';

function WritePostModal(props) {
  return (
    <Modal
      title="Write a Post"
      visible={props.modalVisible}
      onOk={props.postPosts}
      confirmLoading={props.modalLoading}
      onCancel={props.handleModalCancel}
    >
      <div style={{ marginBottom: 16 }}>
        <Input placeholder="Title" onChange={props.onChangeTitle} value={props.title} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <Input.TextArea
          rows={4}
          placeholder="Write some description..."
          onChange={props.onChangeDescription}
          value={props.description}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <Upload
          onRemove={props.onChangeDelAttachment}
          beforeUpload={props.onChangeAddAttachment}
          fileList={props.attachment}
          accept="*/*"
        >
          <Button>
            <Icon type="upload" /> Select an Attachment
          </Button>
        </Upload>
      </div>
    </Modal>
  );
}

WritePostModal.propTypes = {
  modalVisible: PropTypes.bool,
  modalLoading: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  attachment: PropTypes.array,
  postPosts: PropTypes.func,
  handleModalCancel: PropTypes.func,
  onChangeTitle: PropTypes.func,
  onChangeDescription: PropTypes.func,
  onChangeAddAttachment: PropTypes.func,
  onChangeDelAttachment: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  modalVisible: selectModalVisible,
  modalLoading: selectModalLoading,
  title: makeSelectTitle(),
  description: makeSelectDescription(),
  attachment: makeSelectAttachment(),
});

const mapDispatchToProps = dispatch => ({
  postPosts: () => dispatch(postPostsAction()),
  handleModalCancel: () => dispatch(handleModalCancelAction()),
  onChangeTitle: e => dispatch(onChangeTitleAction(e.target.value)),
  onChangeDescription: e => dispatch(onChangeDescriptionAction(e.target.value)),
  onChangeAddAttachment: file => {
    dispatch(onChangeAddAttachmentAction(file));
    return false;
  },
  onChangeDelAttachment: () => dispatch(onChangeDelAttachmentAction()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(WritePostModal);
