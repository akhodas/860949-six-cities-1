import React from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from "recompose";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getOffers} from '../../reducer/data/selectors';


const withRoom = (Component) => {
  class WithRoom extends React.PureComponent {
    render() {
      const {match,
        getOffer,
        isLoadData,
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
      />;
    }

  }

  WithRoom.propTypes = {
    match: PropTypes.object.isRequired,
    getOffer: PropTypes.func.isRequired,
    emailUser: PropTypes.string.isRequired,
    isAuthorizationStatus: PropTypes.bool.isRequired,
    controlAuthorization: PropTypes.func.isRequired,
    isLoadData: PropTypes.bool.isRequired,
  };

  return withRouter(WithRoom);
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    getOffer: (id) => {
      return getOffers(state).find((offer) => offer.id === id);
    }
  });
};

export {withRoom};
export default compose(
    connect(mapStateToProps),
    withRoom
);
