import React from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from "recompose";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getOffers, getComments} from '../../reducer/data/selectors';
import {Operation as OperationData} from '../../reducer/data/data';


const withRoom = (Component) => {
  class WithRoom extends React.PureComponent {
    componentDidMount() {
      const {match, loadComments} = this.props;

      loadComments(+match.params.roomId);
    }

    render() {
      const {
        match,
        getOffer,
        isLoadData,
        comments,
      } = this.props;

      let room = {};
      let images = [];

      if (isLoadData) {
        room = getOffer(+match.params.roomId);

        images = room.images.length > 5 ?
          room.images.slice(0, 6)
          : room.images;
      }

      return <Component
        {...this.props}
        room={room}
        images={images}
        comments={comments}
      />;
    }

  }

  WithRoom.propTypes = {
    match: PropTypes.object.isRequired,
    getOffer: PropTypes.func.isRequired,
    emailUser: PropTypes.string.isRequired,
    isAuthorizationStatus: PropTypes.bool.isRequired,
    controlAuthorization: PropTypes.func.isRequired,
    loadComments: PropTypes.func.isRequired,
    isLoadData: PropTypes.bool.isRequired,
    comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  return withRouter(WithRoom);
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    getOffer: (id) => {
      return getOffers(state).find((offer) => offer.id === id);
    },
    comments: getComments(state),
  });
};

const mapDispatchToProps = (dispatch) => ({
  loadComments: (id) => {
    dispatch(OperationData.loadComments(id));
  },
});

export {withRoom};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRoom
);
