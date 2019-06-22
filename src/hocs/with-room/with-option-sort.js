import React from 'react';
// import PropTypes from 'prop-types';

const withOptionSort = (Component) => {
  class WithOptionSort extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        optionSort: `popular`,
        isMenuSelect: false,
      };

      this.escFunction = ((e) => {
        if (e.keyCode === 27) {
          this.setState({
            isMenuSelect: !this.state.isMenuSelect,
          });
        }
      });

      this._onSelect = this._onSelect.bind(this);
      this._onChange = this._onChange.bind(this);
    }


    componentDidMount() {
      document.addEventListener(`keydown`, this.escFunction, false);
    }

    componentWillUnmount() {
      document.removeEventListener(`keydown`, this.escFunction, false);
    }

    render() {
      return <Component
        {...this.props}
        optionSort={this.state.optionSort}
        isMenuSelect={this.state.isMenuSelect}
        onSelect={this._onSelect}
        onChange={this._onChange}
      />;
    }

    _onChange(e) {
      e.preventDefault();
      this.setState({
        isMenuSelect: !this.state.isMenuSelect,
      });
    }

    _onSelect(e) {
      e.preventDefault();
      this.setState({
        isMenuSelect: !this.state.isMenuSelect,
        optionSort: e.nativeEvent.target.textContent,
      });
    }
  }

  WithOptionSort.propTypes = {
  };

  return WithOptionSort;
};

// const mapStateToProps = (state, ownProps) => {
//     const newCity = (getCity(state) === `No cities` && getOffers(state)[0]) ?
//       getOffers(state)[0].city.name : getCity(state);
//     return Object.assign({}, ownProps, {
//       emailUser: getEmail(state),
//       city: newCity,
//       listCities: getCities(state),
//       listOffers: getOffersForCity(state, newCity),
//       isAuthorizationStatus: getAuthorizationStatus(state),
//       flagDataIsLoading: getFlagDataIsLoading(state),
//     });
//   };

//   const mapDispatchToProps = (dispatch) => ({
//     onCityClick: (newCity) => {
//       dispatch(ActionCreatorData.changeCity(newCity));
//     },

//     controlAuthorization: () => {
//       dispatch(OperationUser.addUserData());
//     },

//     logIn: (data) => {
//       dispatch(OperationUser.logIn(data));
//     },
//   });


//   export {withScreenSwitch};

//   export default compose(
//       connect(mapStateToProps, mapDispatchToProps),
//       withScreenSwitch
//   );


export default withOptionSort;
