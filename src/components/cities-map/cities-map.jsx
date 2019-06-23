import React from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';
import {offerProp} from '../../interface-prop-types/interface-prop-types';

class CitiesMap extends React.PureComponent {
  constructor(props) {
    super(props);

    this._map = null;
    this._iconNormal = null;
    this._iconCurrent = null;
    this._markersLayer = null;
    this._city = null;
    this._zoom = null;
  }

  componentDidMount() {
    const {offers, currentOffer} = this.props;

    if (currentOffer) {
      this._city = [currentOffer.location.latitude, currentOffer.location.longitude];
      this._zoom = currentOffer.location.zoom - 2;
    } else {
      this._city = offers[0] ?
        [offers[0].city.location.latitude, offers[0].city.location.longitude]
        : [52.38333, 4.9];
      this._zoom = offers[0] ?
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
      center: this._city,
      zoom: this._zoom,
      zoomControl: false,
      marker: true
    });

    this._map.setView(this._city, this._zoom);

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

    if (currentOffer) {
      this._city = [currentOffer.location.latitude, currentOffer.location.longitude];
      this._zoom = currentOffer.location.zoom - 2;
    } else {
      this._city = offers[0] ?
        [offers[0].city.location.latitude, offers[0].city.location.longitude]
        : [52.38333, 4.9];
      this._zoom = offers[0] ?
        offers[0].city.location.zoom
        : 12;
    }

    this._map.setView(this._city, this._zoom);

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
  offers: PropTypes.arrayOf(offerProp.isRequired).isRequired,
  currentOffer: offerProp,
  styleClassNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CitiesMap;
