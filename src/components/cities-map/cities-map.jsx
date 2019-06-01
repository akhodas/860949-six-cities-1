import React from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';

class CitiesMap extends React.PureComponent {
  constructor(props) {
    super(props);

    this._map = null;
    this._icon = null;
    this._markersLayer = null;
  }

  render() {
    return <section className="cities__map map">
      <div id="map" style={{height: `100%`}}></div>
    </section>;
  }

  componentDidMount() {
    const {offers} = this.props;

    const city = [52.38333, 4.9];

    this._icon = leaflet.icon({
      iconUrl: `img/icon-markermap.svg`,
      iconSize: [30, 30]
    });

    const zoom = 12;

    this._map = leaflet.map(`map`, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true
    });

    this._map.setView(city, zoom);

    leaflet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    }).addTo(this._map);

    this._markersLayer = new leaflet.LayerGroup();
    this._markersLayer.addTo(this._map);

    offers.forEach((offer) => {
      this._markersLayer.addLayer(
          leaflet
          .marker(
              [offer.city.location.latitude, offer.city.location.longitude],
              {icon: this._icon}
          )
          .addTo(this._map));
    });
  }

  componentDidUpdate() {
    const {offers} = this.props;

    const city = [52.38333, 4.91];
    const zoom = 12.2;

    this._map.setView(city, zoom);

    this._markersLayer.clearLayers();

    offers.forEach((offer) => {
      this._markersLayer.addLayer(
          leaflet
          .marker(
              [offer.city.location.latitude, offer.city.location.longitude],
              {icon: this._icon}
          )
          .addTo(this._map));
    });
  }

}

CitiesMap.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    previewImage: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    city: PropTypes.shape({
      name: PropTypes.string.isRequired,
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
      }),
    }).isRequired,
  })).isRequired,
};

export default CitiesMap;
