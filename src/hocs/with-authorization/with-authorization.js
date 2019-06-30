import React from 'react';
import PropTypes from 'prop-types';

const withAuthorization = (Component) => {
  class WithAuthorization extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        email: `email@email.ru`,
        password: `password`,
      };

      this._handleFormSubmit = this._handleFormSubmit.bind(this);
      this._handleInputChange = this._handleInputChange.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        email={this.state.email}
        password={this.state.password}
        onLogIn={this._handleFormSubmit}
        onChange={this._handleInputChange}
      />;
    }

    _handleInputChange(evt) {
      this.setState({
        [evt.target.name]: evt.target.value,
      });
    }

    _handleFormSubmit(evt) {
      evt.preventDefault();
      this.props.onLogIn({
        email: this.state.email,
        password: this.state.password,
      });
    }
  }

  WithAuthorization.propTypes = {
    onLogIn: PropTypes.func.isRequired,
  };

  return WithAuthorization;
};

export default withAuthorization;
