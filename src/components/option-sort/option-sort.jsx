import React from 'react';
import PropTypes from 'prop-types';
import {TypeSort} from '../../reducer/data/data';

const OptionSort = (props) => {

  const {showMenuSort, typeSort, onChange, onSelect} = props;

  return <React.Fragment>
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by : </span>
      <span className="places__sorting-type" tabIndex="0" onClick={onChange}>
        {typeSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {showMenuSort ?
        <ul className="places__options places__options--custom places__options--opened" onClick={onSelect}>
          <li className={TypeSort.POPULAR === typeSort ?
            `places__option places__option--active` : `places__option`}
          tabIndex="0">{TypeSort.POPULAR}</li>
          <li className={TypeSort.LOW_TO_HIGH === typeSort ?
            `places__option places__option--active` : `places__option`}
          tabIndex="1">{TypeSort.LOW_TO_HIGH}</li>
          <li className={TypeSort.HIGH_TO_LOW === typeSort ?
            `places__option places__option--active` : `places__option`}
          tabIndex="2">{TypeSort.HIGH_TO_LOW}</li>
          <li className={TypeSort.TOP_RATER_FIRST === typeSort ?
            `places__option places__option--active` : `places__option`}
          tabIndex="3">{TypeSort.TOP_RATER_FIRST}</li>
        </ul>
        : null}
    </form>
  </React.Fragment>;
};

OptionSort.propTypes = {
  showMenuSort: PropTypes.bool.isRequired,
  typeSort: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default OptionSort;
