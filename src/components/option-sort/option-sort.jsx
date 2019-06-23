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
        <ul className="places__options places__options--custom places__options--opened"
          onClick={onSelect}>
          {Object.values(TypeSort).map((item, i) => (
            <li className={item === typeSort ?
              `places__option places__option--active` : `places__option`}
            tabIndex={`${i}`}
            key={item}>{item}</li>))
          }
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
