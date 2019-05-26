import React from 'react';
import PropTypes from 'prop-types';

class CitiesMap extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return <section className="cities__map map">
      <div id="map" style={{height: `100%`}}></div>
    </section>;
  }

  componentDidMount() {
    const {offers, leaflet} = this.props;

    const city = [52.38333, 4.9];
    const icon = leaflet.icon({
      iconUrl: `img/icon-markermap.svg`,
      iconSize: [30, 30]
    });

    const zoom = 12;

    const map = leaflet.map(`map`, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true
    });

    map.setView(city, zoom);

    leaflet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    }).addTo(map);

    offers.forEach((offer) => {
      leaflet
      .marker(offer.coordinates, {icon})
      .addTo(map);
    });
  }

}

CitiesMap.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    premium: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  })).isRequired,
  leaflet: PropTypes.object.isRequired,
};

export default CitiesMap;
