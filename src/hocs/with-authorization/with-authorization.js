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

      this._logIn = this._logIn.bind(this);
      this._onChange = this._onChange.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        email={this.state.email}
        password={this.state.password}
        logIn={this._logIn}
        onChange={this._onChange}
      />;
    }

    _onChange(evt) {
      this.setState({
        [evt.target.name]: evt.target.value,
      });
    }

    _logIn(evt) {
      evt.preventDefault();
      this.props.logIn({
        email: this.state.email,
        password: this.state.password,
      });
    }
  }

  WithAuthorization.propTypes = {
    logIn: PropTypes.func.isRequired,
  };

  return WithAuthorization;
};

export default withAuthorization;
