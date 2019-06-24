import React from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from "recompose";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getOffers, getComments, getOffersNear} from '../../reducer/data/selectors';
import {Operation as OperationData} from '../../reducer/data/data';
import Loading from '../../components/loading/loading.jsx';


const withRoom = (Component) => {
  class WithRoom extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        successSendComment: false,
      };
    }

    componentDidMount() {
      const {match, loadComments} = this.props;
      loadComments(+match.params.roomId);
    }

    render() {
      const {
        match,
        getOffer,
        getThreeOffersNear,
        flagDataIsLoading,
        comments,
        isAuthorizationStatus,
        controlAuthorization,
        emailUser,
        sendComment,
      } = this.props;

      let offer = {};
      let offersNear = [];

      if (flagDataIsLoading) {
        offer = getOffer(+match.params.roomId);
        offersNear = getThreeOffersNear(offer);
      }

      return flagDataIsLoading ? (
        <Component
          {...this.props}
          offer={offer}
          offersNear={offersNear}
          comments={comments}
          sendComment={(data) => {
            return sendComment({
              comment: data,
              id: offer.id,
            })
            .then((response) => {
              console.log(`response`);
              console.log(response);
            })
            .catch((response) => {
              console.log(`zxcv`);
              console.log(response);
            });

            if (data.rating > 3) {
              this.setState({successSendComment: false});
            } else {
              this.setState({successSendComment: true});
            }
          }}
          successSend={this.state.successSendComment}
        />
      ) : (
        <Loading
          isAuthorizationStatus={isAuthorizationStatus}
          controlAuthorization={controlAuthorization}
          emailUser={emailUser}
        />
      );
    }

  }

  WithRoom.propTypes = {
    match: PropTypes.object.isRequired,
    getOffer: PropTypes.func.isRequired,
    emailUser: PropTypes.string.isRequired,
    getThreeOffersNear: PropTypes.func.isRequired,
    isAuthorizationStatus: PropTypes.bool.isRequired,
    controlAuthorization: PropTypes.func.isRequired,
    loadComments: PropTypes.func.isRequired,
    flagDataIsLoading: PropTypes.bool.isRequired,
    comments: PropTypes.arrayOf(PropTypes.object).isRequired,
    sendComment: PropTypes.func.isRequired,
  };

  return withRouter(WithRoom);
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    getOffer: (id) => {
      return getOffers(state).find((offer) => offer.id === id);
    },
    comments: getComments(state),
    getThreeOffersNear: (currentOffer) => {
      return getOffersNear(state, currentOffer);
    },
  });
};

const mapDispatchToProps = (dispatch) => ({
  loadComments: (id) => {
    dispatch(OperationData.loadComments(id));
  },

  sendComment: (data) => {
    return dispatch(OperationData.sendComment(data.comment, data.id));
  },
});

export {withRoom};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRoom
);
