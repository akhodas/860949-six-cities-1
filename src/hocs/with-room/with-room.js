import React from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from "recompose";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getComments, getOffersNear, getOffer} from '../../reducer/data/selectors';
import {Operation as OperationData} from '../../reducer/data/data';
import {commentProp, offerProp} from '../../interface-prop-types/interface-prop-types';


const withRoom = (Component) => {
  class WithRoom extends React.PureComponent {

    componentDidMount() {
      const {match, loadComments} = this.props;
      loadComments(+match.params.roomId);
    }

    render() {
      const {
        offer,
        offersNear,
        comments,
        sendComment,
      } = this.props;

      return (
        <Component
          {...this.props}
          offer={offer}
          offersNear={offersNear}
          comments={comments}
          sendComment={(newComment) => sendComment({
            comment: newComment,
            id: offer.id,
          })}
        />
      );
    }

  }

  WithRoom.propTypes = {
    comments: PropTypes.arrayOf(commentProp),
    onControlAuthorization: PropTypes.func.isRequired,
    emailUser: PropTypes.string.isRequired,
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
  const currentIdOffer = +ownProps.match.params.roomId;
  return Object.assign({}, ownProps, {
    offer: getOffer(state, currentIdOffer),
    comments: getComments(state),
    offersNear: getOffersNear(state, currentIdOffer),
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
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    withRoom
);
