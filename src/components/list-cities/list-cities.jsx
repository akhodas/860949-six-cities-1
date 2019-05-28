import React from 'react';
import PropTypes from 'prop-types';

const ListCities = (props) => {
  const {offers} = props;

  const listCities = [];
  offers.forEach((offer) => {
    if (listCities.indexOf(offer.city) < 0 && listCities.length < 6) {
      listCities.push(offer.city);
    }
  });

  return <section className="locations container">
    <ul className="locations__list tabs__list">
      {listCities.map((city) => {
        return <li
          key={city}
          className="locations__item">
          <a className="locations__item-link tabs__item" href="#">
            <span>{city}</span>
          </a>
        </li>;
      })}
    </ul>
  </section>;
};

ListCities.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    premium: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  })).isRequired,
};

export default ListCities;
