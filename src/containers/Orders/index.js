import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Col, Button } from 'antd';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  delOrdersAction,
  getOrdersAction,
  handleAddOrderModalShowAction,
  handleModifyOrderModalShowAction,
  modifyOrdersAction,
} from './orders.actions';
import reducer from './orders.reducer';
import saga from './orders.saga';
import { makeSelectUser } from 'global.selectors';

import AddOrderModal from './AddOrderModal';
import ModifyOrderModal from './ModifyOrderModal';
import OrdersTable from './OrdersTable';
import UploadFileModal from './UploadFileModal';

const key = 'orders';

function Orders(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    props.getOrders();
  }, []);

  const [modifyingId, setModifyingId] = React.useState(0);
  const [files, setFiles] = React.useState([]);
  return (
    <>
      <Helmet>
        <title>Orders List</title>
        <meta name="Orders" content="Orders List" />
      </Helmet>

      <div style={{ marginLeft: '40px', marginBottom: '10px' }}>
        <h1 style={{ fontSize: 'x-large' }}> Orders List </h1>
      </div>

      <Row style={{ width: '85vw', overflowX: 'scroll' }}>
        <Col span={24}>
          <OrdersTable
            onModifyOrder={props.handleModifyOrderModalShow}
            setModifyingId={setModifyingId}
            delOrders={id => props.delOrders(id)}
          />
        </Col>
      </Row>

      <AddOrderModal />
      <ModifyOrderModal modifyingId={modifyingId} />
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={props.handleAddOrderModalShow}>
          Add
        </Button>
      </div>
      <UploadFileModal setFiles={setFiles} />
      <Row>
        <Col span={24}>
          <input type="file" id="xlsxInput" accept=".xlsx" multiple={false} />
          <Button
            onClick={() => {
              console.log('upload');
            }}
            disabled={files.length == 0}
          >
            Upload
          </Button>
        </Col>
      </Row>
    </>
  );
}

Orders.propTypes = {
  getOrders: PropTypes.func,
  handleAddOrderModalShow: PropTypes.func,
  handleModifyOrderModalShow: PropTypes.func,
  delOrders: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({ user: makeSelectUser() });

const mapDispatchToProps = dispatch => ({
  getOrders: () => dispatch(getOrdersAction()),
  delOrders: id => dispatch(delOrdersAction(id)),
  handleAddOrderModalShow: () => dispatch(handleAddOrderModalShowAction()),
  handleModifyOrderModalShow: () => dispatch(handleModifyOrderModalShowAction()),
  modifyOrders: id => dispatch(modifyOrdersAction(id)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Orders);
