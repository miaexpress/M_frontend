import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Button, Modal, Input, Icon, Upload } from 'antd';

import { selectAttachmentModalVisible, selectAttachmentModalLoading, makeSelectAttachment } from '../board.selectors';
import {
  handleAttachmentModalCancelAction,
  putPostsWithAttachment,
  onChangeAddAttachmentAction,
  onChangeDelAttachmentAction,
} from '../board.actions';

function AddAttachmentModal(props) {
  console.log('AddAttachmentModal>>>', props);
  return (
    <Modal
      title="Select an attachment"
      visible={props.modalVisible}
      onOk={props.putPostsWithAttachment}
      confirmLoading={props.modalLoading}
      onCancel={props.handleModalCancel}
    >
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

AddAttachmentModal.propTypes = {
  modalVisible: PropTypes.bool,
  modalLoading: PropTypes.bool,
  attachment: PropTypes.array,
  postPosts: PropTypes.func,
  handleModalCancel: PropTypes.func,
  onChangeAddAttachment: PropTypes.func,
  onChangeDelAttachment: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  modalVisible: selectAttachmentModalVisible,
  modalLoading: selectAttachmentModalLoading,
  attachment: makeSelectAttachment(),
});

const mapDispatchToProps = dispatch => ({
  putPostsWithAttachment: () => dispatch(putPostsWithAttachment()),
  handleModalCancel: () => dispatch(handleAttachmentModalCancelAction()),
  onChangeAddAttachment: file => {
    dispatch(onChangeAddAttachmentAction(file));
    return false;
  },
  onChangeDelAttachment: () => dispatch(onChangeDelAttachmentAction()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AddAttachmentModal);
