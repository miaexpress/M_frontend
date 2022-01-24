import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// const { Loader } = require('google-maps');
import { Loader, LoaderOptions } from 'google-maps';

function GoogleMapComp(props) {
  /* ------------------ */
  /* -     Const     - */
  /* ------------------ */

  const [map, setMap] = useState('');
  const [mapDiv, setMapDiv] = useState(document.getElementById('map'));
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
    console.log('in useEffect');
    if (mapDiv) {
      console.log('in useEffect');
      //   initMap();
    } else {
      console.log('map div is ' + mapDiv);
    }
  }, [document.getElementById('map')]);

  async function initMap() {
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    console.log('apikey', apiKey);
    const options = {};
    const loader = new Loader(apiKey, options);
    console.log('test');

    // loader.load().then(function(google) {
    //     const map = new google.maps.Map(document.getElementById('map'), {
    //     center: { lat: -34.397, lng: 150.644 },
    //     zoom: 8,
    //     });
    // });
    const google = await loader.load();
    new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
    // setMap(map);
  }

  // const google = await loader.load();
  // map = new google.maps.Map(document.getElementById('map'), {
  //   center: { lat: -34.397, lng: 150.644 },
  //   zoom: 8,
  // });

  //   React.useEffect(() => {
  //     initMap();
  //   }, []);

  /* ------------------ */
  /* -     Handler     - */
  /* ------------------ */

  /* ------------------ */
  /* -     Render     - */
  /* ------------------ */
  //   if (props.zonesList.length !== 0) {
  return <div>GoogleMapcomp</div>;
  //   } else {
  //     return <React.Fragment />;
  //   }
}

GoogleMapComp.propTypes = {
  zonesList: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(GoogleMapComp);
