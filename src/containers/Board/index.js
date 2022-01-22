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
  getPostsAction,
  handleModalShowAction,
  onChangeCheckboxAction,
  handleAttachmentModalShowAction,
} from './board.actions';
import reducer from './board.reducer';
import saga from './board.saga';

import WritePostModal from './WritePostModal';
import AddAttachmentModal from './AddAttachmentModal';
import PostTable from './PostTable';
// import ShowTable from './ShowTable';

const key = 'board';

function Board(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    props.getPosts();
  }, []);

  // const handleOnCheckboxChange = (id, value) => {
  //   props.onChangeCheckbox(id, value);
  // };

  return (
    <>
      <Helmet>
        <title>Summary</title>
        <meta name="Task" content="Task Summary" />
      </Helmet>

      <div style={{ 'marginLeft': '40px', 'marginBottom': '10px' }}>
        <h1 style={{ 'fontSize': 'x-large' }}> All TO-DO </h1>
      </div>

      <Row>
        <Col span={24}>
          <PostTable onCheckboxChange={props.onChangeCheckbox} onAttachButtonClick={props.handleAttachmentModalShow} />
        </Col>
      </Row>

      {/* <ShowTable /> */}

      <WritePostModal />
      <AddAttachmentModal />
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={props.handleModalShow}>
          Add
        </Button>
      </div>
    </>
  );
}

Board.propTypes = {
  getPosts: PropTypes.func,
  handleModalShow: PropTypes.func,
  onChangeCheckbox: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(getPostsAction()),
  handleModalShow: () => dispatch(handleModalShowAction()),
  onChangeCheckbox: (id, value) => dispatch(onChangeCheckboxAction(id, value)),
  handleAttachmentModalShow: id => dispatch(handleAttachmentModalShowAction(id)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Board);
