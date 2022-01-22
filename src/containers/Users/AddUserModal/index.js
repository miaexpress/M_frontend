import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Button, Modal, Input, Icon, Upload } from 'antd';

import {
  selectAddModalVisible,
  selectAddModalLoading,
  makeSelectAccountId,
  makeSelectName,
  makeSelectPassword,
  makeSelectEmail,
} from '../users.selectors';
import {
  handleAddModalCancelAction,
  onChangeAccountIdAction,
  onChangeEmailAction,
  onChangePasswordAction,
  onChangeNameAction,
  addUsersAction,
} from '../users.actions';

function AddUserModal(props) {
  return (
    <Modal
      title="AddUser"
      visible={props.addModalVisible}
      onOk={props.addUsers}
      confirmLoading={props.addModalLoading}
      onCancel={props.handleAddModalCancel}
    >
      <div style={{ marginBottom: 16 }}>
        <Input placeholder="AccountId" onChange={props.onChangeAccountId} value={props.accountId} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <Input placeholder="Name" onChange={props.onChangeName} value={props.name} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <Input placeholder="Email" onChange={props.onChangeEmail} value={props.email} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <Input placeholder="Password" onChange={props.onChangePassword} value={props.password} />
      </div>
    </Modal>
  );
}

AddUserModal.propTypes = {
  addModalVisible: PropTypes.bool,
  addModalLoading: PropTypes.bool,
  accountId: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  addUsers: PropTypes.func,
  handleAddModalCancel: PropTypes.func,
  onChangeAccountId: PropTypes.func,
  onChangeName: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onChangePassword: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  addModalVisible: selectAddModalVisible,
  addModalLoading: selectAddModalLoading,
  accountId: makeSelectAccountId,
  name: makeSelectName,
  email: makeSelectEmail,
  password: makeSelectPassword,
});

const mapDispatchToProps = dispatch => ({
  addUsers: () => dispatch(addUsersAction()),
  handleAddModalCancel: () => dispatch(handleAddModalCancelAction()),
  onChangeAccountId: e => dispatch(onChangeAccountIdAction(e.target.value)),
  onChangeName: e => dispatch(onChangeNameAction(e.target.value)),
  onChangeEmail: e => dispatch(onChangeEmailAction(e.target.value)),
  onChangePassword: e => dispatch(onChangePasswordAction(e.target.value)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AddUserModal);
