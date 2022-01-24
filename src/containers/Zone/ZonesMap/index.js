import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Table, Button } from 'antd';
import { selectZonesList } from '../zones.selectors';
import {
  handleAddZoneModalShowAction,
  handleAddZoneModalCancelAction,
  handleModifyZoneModalCancelAction,
  handleModifyZoneModalShowAction,
  onChangeDescriptionAction,
  onChangeTitleAction,
  onChangePointsAction,
  modifyZonesAction,
} from '../zones.actions';
import instance from 'utils/request';
// const { Loader } = require('google-maps');
import { Loader, LoaderOptions } from 'google-maps';
import GoogleMapComp from './GoogleMapComp';

function ZonesMap(props) {
  /* ------------------ */
  /* -     Const     - */
  /* ------------------ */

  /* ------------------ */
  /* -     Handler     - */
  /* ------------------ */

  /* ------------------ */
  /* -     Render     - */
  /* ------------------ */
  //   if (props.zonesList.length !== 0) {
  return (
    <div>
      <div id="map" style={{ height: '100vh', width: '100%' }}></div>
      <GoogleMapComp />
    </div>
  );
  //   } else {
  //     return <React.Fragment />;
  //   }
}

ZonesMap.propTypes = {
  zonesList: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  zonesList: selectZonesList,
});

const mapDispatchToProps = dispatch => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ZonesMap);
