import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import CitiesMap from '../cities-map/cities-map.jsx';
import ListCities from '../list-cities/list-cities.jsx';
import ListOffers from '../list-offers/list-offers.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item';

const ListOffersWrapped = withActiveItem(ListOffers);

const MainPage = (props) => {
  const {
    offers,
    city,
    listCities,
    onClickTitleCard,
    onClickImageCard,
    onCityClick,
    isAuthorizationStatus,
    controlAuthorization,
    emailUser,
    isLoadData,
  } = props;

  return <React.Fragment>
    <div style = {{display: `none`}}>
      <svg xmlns="http://www.w3.org/2000/svg">
        <symbol id="icon-arrow-select" viewBox="0 0 7 4">
          <path fillRule="evenodd"
            clipRule="evenodd"
            d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z">
          </path>
        </symbol>
        <symbol id="icon-bookmark" viewBox="0 0 17 18">
          <path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path>
        </symbol>
        <symbol id="icon-star" viewBox="0 0 13 12">
          <path fillRule="evenodd"
            clipRule="evenodd"
            d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z">
          </path>
        </symbol>
      </svg>
    </div>

    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to="/">
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo" width="81" height="41"
              />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link className="header__nav-link header__nav-link--profile"
                  onClick={controlAuthorization}
                  to={isAuthorizationStatus ? `/login` : `/favorites`}
                >
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  {isAuthorizationStatus ?
                    <span className="header__login">Sign in</span>
                    :
                    <span className="header__user-name user__name">{emailUser}</span>
                  }
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

    {isLoadData ?
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="cities tabs">
          <ListCities
            selectedCity = {city}
            listCities = {listCities}
            onCityClick = {onCityClick}
          />
        </div>
        <div className="cities__places-wrapper">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {city}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex="0">
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex="0">Popular</li>
                  <li className="places__option" tabIndex="0">Price: low to high</li>
                  <li className="places__option" tabIndex="0">Price: high to low</li>
                  <li className="places__option" tabIndex="0">Top rated first</li>
                </ul>
              </form>
              <ListOffersWrapped
                offers = {offers}
                onClickTitleCard = {onClickTitleCard}
                onClickImageCard = {onClickImageCard}
              />
            </section>
            <div className="cities__right-section">
              <CitiesMap
                offers = {offers}
              />
            </div>
          </div>
        </div>

      </main>
      :
      <main className="page__main page__main--index">
        <div style={{
          display: `flex`,
          width: `100%`,
          height: `500px`,
        }}>
          <div style={{
            margin: `auto`,
          }}>
            <h2>Loading...</h2>
          </div>
        </div>
      </main>
    }

  </React.Fragment>;
};

MainPage.propTypes = {
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
  })).isRequired,
  city: PropTypes.string.isRequired,
  listCities: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickTitleCard: PropTypes.func.isRequired,
  onClickImageCard: PropTypes.func.isRequired,
  onCityClick: PropTypes.func.isRequired,
  isAuthorizationStatus: PropTypes.bool.isRequired,
  controlAuthorization: PropTypes.func.isRequired,
  emailUser: PropTypes.string.isRequired,
  isLoadData: PropTypes.bool.isRequired,
};

export default MainPage;
