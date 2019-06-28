import React from 'react';
import PropTypes from 'prop-types';


const ListCities = (props) => {
  const {selectedCity, listCities, onCityClick} = props;

  return <section className="locations container">
    <ul className="locations__list tabs__list">
      {listCities.map((city) => {
        return <li
          key={city}
          className="locations__item">
          <a
            className={`locations__item-link tabs__item ${
              city === selectedCity ? `tabs__item--active` : ``
            }`}
            href="#"
            onClick = {() => onCityClick(city)}
          >
            <span>{city}</span>
          </a>
        </li>;
      })}
    </ul>
  </section>;
};

ListCities.propTypes = {
  selectedCity: PropTypes.string.isRequired,
  listCities: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCityClick: PropTypes.func.isRequired,
};

export default ListCities;
