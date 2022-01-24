// import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
// import { compose } from 'redux';
// import { Table, Checkbox, Button } from 'antd';
// import { selectZonesList } from '../zones.selectors';
// import {
//   handleAddZoneModalShowAction,
//   handleAddZoneModalCancelAction,
//   handleModifyZoneModalCancelAction,
//   handleModifyZoneModalShowAction,
//   onChangeDescriptionAction,
//   onChangeTitleAction,
//   onChangePointsAction,
//   modifyZonesAction,
// } from '../zones.actions';
// import instance from 'utils/request';

// function ZonesTable(props) {
//   /* ------------------ */
//   /* -     Const     - */
//   /* ------------------ */
//   const columns = [
//     {
//       title: 'AccountId',
//       dataIndex: 'accountId',
//       key: 'accountId',
//     },
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Email',
//       dataIndex: 'email',
//       key: 'email',
//     },
//     {
//       title: 'Edit',
//       dataIndex: 'edit',
//       key: 'edit',
//       render: (value, record) => renderEditButton(value, record),
//     },
//   ];

//   /* ------------------ */
//   /* -     Handler     - */
//   /* ------------------ */

//   const renderEditButton = (value, record) => {
//     return <Button onClick={() => renderEditModal(value, record)}>Edit</Button>;
//   };

//   const renderEditModal = (value, record) => {
//     console.log(value, record);
//     props.onModifyUser();
//     props.setModifyingId(record.id)
//     props.onChangeAccountId(record.accountId)
//     props.onChangeEmail(record.email)
//     props.onChangeName(record.name)
//   };

//   /* ------------------ */
//   /* -     Render     - */
//   /* ------------------ */
//   return <Table dataSource={props.usersList} columns={columns} />;
// }

// UsersTable.propTypes = {
//   usersList: PropTypes.array,
//   onModifyModalShow: PropTypes.func,
//   onChangeAccountId: PropTypes.func,
//   onChangeName: PropTypes.func,
//   onChangeEmail: PropTypes.func,
//   onChangePassword: PropTypes.func,
//   setModifyingId:PropTypes.func
// };

// const mapStateToProps = createStructuredSelector({
//   usersList: selectUsersList,
// });

// const mapDispatchToProps = dispatch => ({
//   modifyUsers: (id) => dispatch(modifyUsersAction(id)),
//   handleModifyModalCancel: () => dispatch(handleModifyModalCancelAction()),
//   onChangeAccountId: e => dispatch(onChangeAccountIdAction(e)),
//   onChangeName: e => dispatch(onChangeNameAction(e)),
//   onChangeEmail: e => dispatch(onChangeEmailAction(e)),
//   onChangePassword: e => dispatch(onChangePasswordAction(e)),
// });

// const withConnect = connect(mapStateToProps,mapDispatchToProps);

// export default compose(withConnect, memo)(ZonesTable);
