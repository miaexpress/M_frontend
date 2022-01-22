import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Table, Checkbox, Button } from 'antd';
import { selectUsersList } from '../users.selectors';
import instance from 'utils/request';


function UsersTable(props) {
  /* ------------------ */
  /* -     Const     - */
  /* ------------------ */
  const columns = [
    {
      title: 'AccountId',
      dataIndex: 'accountId',
      key: 'accountId',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
      render: text => <pre style={{ marginBottom: 0, maxHeight: 100 }}>{text}</pre>,
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      key: 'edit',
      render: (value, record) => renderEditButton(value, record.id),
    },
  ];

  /* ------------------ */
  /* -     Handler     - */
  /* ------------------ */
  const handleOnChange = e => {
    props.onCheckboxChange(e.target.record.id, e.target.value);
  };

  const renderEditButton = (value, id) => {
    return <Button onClick={() => renderEditModal(value,id)}>Edit</Button>;
  };

  const renderEditModal = id => {
    props.onAttachButtonClick(id);
  };

  /* ------------------ */
  /* -     Render     - */
  /* ------------------ */
  return <Table dataSource={props.usersList} columns={columns} />;
}

UsersTable.propTypes = {
  usersList: PropTypes.array,
  onModifyModalShow: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  usersList: selectUsersList,
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect, memo)(UsersTable);
