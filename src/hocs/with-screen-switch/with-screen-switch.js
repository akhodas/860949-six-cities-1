import React from 'react';
import PropTypes from 'prop-types';
import {compose} from "recompose";
import {connect} from 'react-redux';

import {
  ActionCreator as ActionCreatorData,
  Operation as OperationData
} from '../../reducer/data/data';
import {Operation as OperationUser} from '../../reducer/user/user';
import {
  getCity,
  getCities,
  getOffers,
  getOffersForCity,
  getFlagDataIsLoading,
} from '../../reducer/data/selectors';
import {getAuthorizationStatus, getEmail} from '../../reducer/user/selectors';
import {offerProp} from '../../interface-prop-types/interface-prop-types';
import Loading from '../../components/loading/loading.jsx';


const withScreenSwitch = (Component) => {
  class WithScreenSwitch extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        loading: false,
        firstStart: true,
      };
    }

    componentDidMount() {
      const {isAuthorizationStatus, controlAuthorization
      } = this.props;
      console.log(`componentDidMount`);
      if (this.state.firstStart) {
        this.setState({firstStart: false});
      }

      if (!isAuthorizationStatus) {
        console.log(`isAuthorizationStatus`);
        // console.log(isAuthorizationStatus, this.state.loading, this.state.firstStart);
        this.setState({loading: true});
        controlAuthorization()
        .then(() => {
          this.setState({loading: false});
        })
        .catch(() => {
          this.setState({loading: false});
        });
      }
    }

    // componentDidUpdate( {
    //   const {isAuthorizationStatus, controlAuthorization
    //   } = this.props;
    //   console.log(`componentDidUpdate`);

    //   if (!isAuthorizationStatus || this.state.loading) {
    //     this.setState({loading: false});
    //     controlAuthorization()
    //     .then(() => {
    //       this.setState({loading: true});
    //     })
    //     .catch(() => {
    //       this.setState({loading: true});
    //     });
    //   }
    // }

    render() {
      const {isAuthorizationStatus, controlAuthorization, emailUser
      } = this.props;
      console.log(`withScreenSwitch`);
      console.log(isAuthorizationStatus, this.state.loading, this.state.firstStart);
      return (!this.state.loading && !this.state.firstStart) ? (<Component
        {...this.props}
        controlAuthorization={() => console.log(`click`)}
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

  // const WithScreenSwitch = (props) => {
  //   const {isAuthorizationStatus, controlAuthorization, emailUser} = props;
  //   let flag = false;
  //   if (!isAuthorizationStatus) {
  //     controlAuthorization()
  //     .then(() => {
  //       flag = true;
  //       console.log(`then`);
  //     })
  //     .catch(() => {
  //       flag = true;
  //       console.log(`catch`);
  //     });
  //     console.log(`inner`);
  //   }
  //   console.log(`withScreenSwitch`);
  //   return flag ? (<Component
  //     {...props}
  //     controlAuthorization={() => console.log(`click`)}
  //   />
  //   ) : (
  //     <Loading
  //       isAuthorizationStatus={isAuthorizationStatus}
  //       controlAuthorization={controlAuthorization}
  //       emailUser={emailUser}
  //     />
  //   );
  // };

  // const WithScreenSwitch = (props) => {
  //   return <Component
  //     {...props}
  //   />;
  // };

  WithScreenSwitch.propTypes = {
    listOffers: PropTypes.arrayOf(offerProp.isRequired).isRequired,
    city: PropTypes.string.isRequired,
    listCities: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClickTitleCard: PropTypes.func.isRequired,
    onCityClick: PropTypes.func.isRequired,
    logIn: PropTypes.func.isRequired,
    emailUser: PropTypes.string.isRequired,
    isAuthorizationStatus: PropTypes.bool.isRequired,
    controlAuthorization: PropTypes.func.isRequired,
    flagDataIsLoading: PropTypes.bool.isRequired,
    onClickBookmark: PropTypes.func.isRequired,
  };

  return WithScreenSwitch;
};

const mapStateToProps = (state, ownProps) => {
  const newCity = (getCity(state) === `No cities` && getOffers(state)[0]) ?
    getOffers(state)[0].city.name : getCity(state);
  return Object.assign({}, ownProps, {
    emailUser: getEmail(state),
    city: newCity,
    listCities: getCities(state),
    listOffers: getOffersForCity(state, newCity),
    isAuthorizationStatus: getAuthorizationStatus(state),
    flagDataIsLoading: getFlagDataIsLoading(state),
  });
};

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (newCity) => {
    dispatch(ActionCreatorData.changeCity(newCity));
  },

  controlAuthorization: () => {
    return dispatch(OperationUser.addUserData());
  },

  logIn: (data) => {
    dispatch(OperationUser.logIn(data));
  },

  onClickBookmark: (data) => {
    dispatch(
        OperationData.changeFavoritesStatus(
            data.idOffer,
            data.favoriteStatus,
            data.objHistory
        )
    );
  },
});


export {withScreenSwitch};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withScreenSwitch
);
