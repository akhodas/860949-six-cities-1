import React from 'react';
import {compose} from "recompose";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getTypeSort} from '../../reducer/data/selectors';
import {ActionCreator} from '../../reducer/data/data';


const withOptionSort = (Component) => {
  class WithOptionSort extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        typeSort: props.typeSort,
        showMenuSort: false,
      };

      this.escFunction = ((e) => {
        if (e.keyCode === 27) {
          this.setState({
            showMenuSort: !this.state.showMenuSort,
          });
        }
      });

      this._onChangeTypeSort = this._onChangeTypeSort.bind(this);
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
        typeSort={this.state.typeSort}
        showMenuSort={this.state.showMenuSort}
        onSelect={this._onChangeTypeSort}
        onChange={this._onChange}
      />;
    }

    _onChange() {
      this.setState({
        showMenuSort: !this.state.showMenuSort,
      });
    }

    _onChangeTypeSort(e) {
      const selectTypeSort = e.nativeEvent.target.textContent;
      this.props.onChangeTypeSort(selectTypeSort);
      this.setState({
        showMenuSort: !this.state.showMenuSort,
        typeSort: selectTypeSort,
      });
    }
  }

  WithOptionSort.propTypes = {
    typeSort: PropTypes.string.isRequired,
    onChangeTypeSort: PropTypes.func.isRequired,
  };

  return WithOptionSort;
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    typeSort: getTypeSort(state),
  });
};

const mapDispatchToProps = (dispatch) => ({
  onChangeTypeSort: (typeSort) => {
    dispatch(ActionCreator.setTypeSort(typeSort));
  },
});


export {withOptionSort};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withOptionSort
);

