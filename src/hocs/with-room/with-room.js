import React from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from "recompose";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getOffers, getComments, getOffersNear} from '../../reducer/data/selectors';
import {Operation as OperationData} from '../../reducer/data/data';
// import Loading from '../../components/loading/loading.jsx';
import {commentProp, offerProp} from '../../interface-prop-types/interface-prop-types';


const withRoom = (Component) => {
  class WithRoom extends React.PureComponent {

    componentDidMount() {
      const {match, loadComments} = this.props;
      loadComments(+match.params.roomId);
    }

    render() {
      const {
        // match,
        // getOffer,
        // getThreeOffersNear,
        offer,
        offersNear,
        // flagDataIsLoading,
        comments,
        // isAuthorizationStatus,
        // onControlAuthorization,
        // emailUser,
        sendComment,
      } = this.props;

      // let offer = {};
      // let offersNear = [];

      // if (flagDataIsLoading) {
      //   offer = getOffer(+match.params.roomId);
      //   offersNear = getThreeOffersNear(offer);
      // }

      return <Component
        {...this.props}
        offer={offer}
        offersNear={offersNear}
        comments={comments}
        sendComment={(newComment) => sendComment({
          comment: newComment,
          id: offer.id,
        })}
      />;
    }

  }

  WithRoom.propTypes = {
    comments: PropTypes.arrayOf(commentProp),
    onControlAuthorization: PropTypes.func.isRequired,
    emailUser: PropTypes.string.isRequired,
    flagDataIsLoading: PropTypes.bool.isRequired,
    // getOffer: PropTypes.func.isRequired,
    // getThreeOffersNear: PropTypes.func.isRequired,
    offer: offerProp,
    offersNear: PropTypes.arrayOf(offerProp),
    isAuthorizationStatus: PropTypes.bool.isRequired,
    loadComments: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    onClickBookmark: PropTypes.func.isRequired,
    sendComment: PropTypes.func.isRequired,
  };

  return WithRoom;
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    offer: getOffers(state).find((offer) => offer.id === +ownProps.match.params.roomId),
    // }, getOffer(+match.params.roomId)
    // getOffer: (id) => {
    //   return getOffers(state).find((offer) => offer.id === id);
    // }, getOffer(+match.params.roomId)
    // offersNear = getThreeOffersNear(offer);
    comments: getComments(state),
    offersNear: getOffersNear(
        state,
        getOffers(state).find((offer) => offer.id === +ownProps.match.params.roomId)
    ),
  });
};

const mapDispatchToProps = (dispatch) => ({
  loadComments: (id) => {
    dispatch(OperationData.loadComments(id));
  },

  sendComment: (data) => dispatch(OperationData.sendComment(data.comment, data.id)),
});

export {withRoom};
export default compose(
    withRouter, connect(mapStateToProps, mapDispatchToProps),
    withRoom
);
