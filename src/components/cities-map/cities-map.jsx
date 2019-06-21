import React from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';

class CitiesMap extends React.PureComponent {
  constructor(props) {
    super(props);

    this._map = null;
    this._iconNormal = null;
    this._iconCurrent = null;
    this._markersLayer = null;
  }

  componentDidMount() {
    const {offers, currentOffer} = this.props;

    let city = null;
    let zoom = null;

    if (currentOffer) {
      city = [currentOffer.city.location.latitude, currentOffer.city.location.longitude];
      zoom = currentOffer.city.location.zoom;
    } else {
      city = offers[0] ?
        [offers[0].city.location.latitude, offers[0].city.location.longitude]
        : [52.38333, 4.9];
      zoom = offers[0] ?
        offers[0].city.location.zoom
        : 12;
    }

    this._iconNormal = leaflet.icon({
      iconUrl: `img/icon-markermap.svg`,
      iconSize: [30, 30]
    });

    this._iconCurrent = leaflet.icon({
      iconUrl: `img/icon-markermap2.svg`,
      iconSize: [30, 30]
    });

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

    offers.forEach((offer) => {
      this._markersLayer.addLayer(
          leaflet
            .marker(
                [offer.location.latitude, offer.location.longitude],
                {icon: this._iconNormal}
            )
            .addTo(this._map));
    });

    if (currentOffer) {
      this._markersLayer.addLayer(
          leaflet
            .marker(
                [currentOffer.location.latitude, currentOffer.location.longitude],
                {icon: this._iconCurrent}
            )
            .addTo(this._map));
    }

    this._markersLayer.addTo(this._map);
  }

  componentDidUpdate() {
    const {offers, currentOffer} = this.props;

    let city = null;
    let zoom = null;

    if (currentOffer) {
      city = [currentOffer.city.location.latitude, currentOffer.city.location.longitude];
      zoom = currentOffer.city.location.zoom;
    } else {
      city = offers[0] ?
        [offers[0].city.location.latitude, offers[0].city.location.longitude]
        : [52.38333, 4.9];
      zoom = offers[0] ?
        offers[0].city.location.zoom
        : 12;
    }

    this._map.setView(city, zoom);

    this._markersLayer.clearLayers();

    offers.forEach((offer) => {
      this._markersLayer.addLayer(
          leaflet
            .marker(
                [offer.location.latitude, offer.location.longitude],
                {icon: this._iconNormal}
            )
            .addTo(this._map));
    });

    if (currentOffer) {
      this._markersLayer.addLayer(
          leaflet
            .marker(
                [currentOffer.location.latitude, currentOffer.location.longitude],
                {icon: this._iconCurrent}
            )
            .addTo(this._map));
    }
  }

  render() {
    const {styleClassNames} = this.props;
    return <section className={`${styleClassNames}__map map`}>
      <div id="map" style={{height: `100%`}}></div>
    </section>;
  }
}

CitiesMap.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    city: PropTypes.shape({
      name: PropTypes.string.isRequired,
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
    previewImage: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string.isRequired),
    title: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    isPremium: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    bedrooms: PropTypes.number.isRequired,
    maxAdults: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    goods: PropTypes.arrayOf(PropTypes.string.isRequired),
    host: PropTypes.shape({
      id: PropTypes.number.isRequired,
      isPro: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }).isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired).isRequired,
  currentOffer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    city: PropTypes.shape({
      name: PropTypes.string.isRequired,
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
    previewImage: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string.isRequired),
    title: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    isPremium: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    bedrooms: PropTypes.number.isRequired,
    maxAdults: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    goods: PropTypes.arrayOf(PropTypes.string.isRequired),
    host: PropTypes.shape({
      id: PropTypes.number.isRequired,
      isPro: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }).isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
  }),
  styleClassNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CitiesMap;
