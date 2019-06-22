import React from 'react';
import PropTypes from 'prop-types';

const OptionSort = (props) => {

  const {isMenuSelect, optionSort, onChange, onSelect} = props;

  return <React.Fragment>
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by : </span>
      <span className="places__sorting-type" tabIndex="0" onClick={onChange}>
        {optionSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isMenuSelect ?
        <ul className="places__options places__options--custom places__options--opened" onClick={onSelect}>
          <li className="places__option" tabIndex="0">Popular</li>
          <li className="places__option" tabIndex="1">Price: low to high</li>
          <li className="places__option places__option--active" tabIndex="2">Price: high to low</li>
          <li className="places__option" tabIndex="3">Top rated first</li>
        </ul>
        : null}
    </form>
  </React.Fragment>;
};

OptionSort.propTypes = {
  isMenuSelect: PropTypes.bool.isRequired,
  optionSort: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default OptionSort;
