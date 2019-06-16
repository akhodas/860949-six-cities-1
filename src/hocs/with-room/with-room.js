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

// const withRoom = (Component) => {
//   class WithRoom extends React.PureComponent {
//     constructor(props) {
//       super(props);

//       this.room = {};
//       this.images = [];
//     }

//     componentDidMount() {
//       const {match,
//         getOffer,
//         isLoadData,
//       } = this.props;

//       if (isLoadData) {

//         this.room = getOffer(+match.params.roomId);
//         console.log(`mount`);
//         console.log(this.room);
//         console.log(isLoadData);

//         this.images = this.room.images.length > 5 ?
//           this.room.images.slice(0, 6)
//           : this.room.images;

//       }
//     }


//     render() {
//       return <Component
//         {...this.props}
//         room={this.room}
//         images={this.images}
//       />;
//     }

//   }

//   WithRoom.propTypes = {
//     match: PropTypes.object.isRequired,
//     getOffer: PropTypes.func.isRequired,
//     emailUser: PropTypes.string.isRequired,
//     isAuthorizationStatus: PropTypes.bool.isRequired,
//     controlAuthorization: PropTypes.func.isRequired,
//     isLoadData: PropTypes.bool.isRequired,
//   };

//   return withRouter(WithRoom);
// };