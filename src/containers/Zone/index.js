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
  getZonesAction,
  handleAddZoneModalShowAction,
  handleModifyZoneModalShowAction,
  modifyZonesAction,
} from './zones.actions';
import reducer from './zones.reducer';
import saga from './zones.saga';

import AddZoneModal from './AddZoneModal';
import ModifyZoneModal from './ModifyZoneModal';
import ZonesTable from './ZonesTable';
import ZonesMap from './ZonesMap';

const key = 'zones';

function Zones(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    props.getZones();
  }, []);

  const [modifyingId, setModifyingId] = React.useState(0);

  return (
    <>
      <Helmet>
        <title>Zones List</title>
        <meta name="Zones" content="Zones List" />
      </Helmet>

      <div style={{ marginLeft: '40px', marginBottom: '10px' }}>
        <h1 style={{ fontSize: 'x-large' }}> Zones List </h1>
      </div>

      <Row>
        <Col span={24}>
          {/* <ZonesTable onModifyUser={props.handleModifyModalShow} setModifyingId={setModifyingId} /> */}
          <ZonesMap></ZonesMap>
        </Col>
      </Row>

      {/* <AddZoneModal /> */}
      {/* <ModifyZoneModal modifyingId={modifyingId} /> */}
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={props.handleAddModalShow}>
          Add
        </Button>
      </div>
    </>
  );
}

Zones.propTypes = {
  getZones: PropTypes.func,
  handleAddZoneModalShow: PropTypes.func,
  handleModifyZoneModalShow: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({
  getZones: () => dispatch(getZonesAction()),
  handleAddZoneModalShow: () => dispatch(handleAddZoneModalShowAction()),
  handleModifyZoneModalShow: () => dispatch(handleModifyZoneModalShowAction()),
  modifyZones: id => dispatch(modifyZonesAction(id)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Zones);
