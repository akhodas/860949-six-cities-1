import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import CitiesMap from '../cities-map/cities-map.jsx';
import ListCities from '../list-cities/list-cities.jsx';
import ListOffers from '../list-offers/list-offers.jsx';
import OptionSort from '../option-sort/option-sort.jsx';
import withOptionSort from '../../hocs/with-option-sort/with-option-sort.js';
import {offerProp} from '../../interface-prop-types/interface-prop-types.js';
import EmptyMain from '../main-empty/main-empty.jsx';


const OptionSortWrapped = withOptionSort(OptionSort);


const MainPage = (props) => {
  const {
    offers,
    city,
    listCities,
    onClickTitleCard,
    onCityClick,
    isAuthorizationStatus,
    onControlAuthorization,
    emailUser,
    activeOffer,
    onChangeActiveOffer,
    onClickBookmark,
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
                  onClick={onControlAuthorization}
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

    <main className={
      offers.length ? (
        `page__main page__main--index`
      ) : (
        `page__main page__main--index page__main--index-empty`
      )}>

      <h1 className="visually-hidden">Cities</h1>
      <div className="cities tabs">
        <ListCities
          selectedCity = {city}
          listCities = {listCities}
          onCityClick = {onCityClick}
        />
      </div>

      {offers.length ? (
        <div className="cities__places-wrapper">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {city}</b>

              <OptionSortWrapped />

              <ListOffers
                offers = {offers}
                onClickTitleCard = {onClickTitleCard}
                onChangeActiveOffer = {onChangeActiveOffer}
                onClickBookmark = {onClickBookmark}
                styleClassNames = {[
                  `cities__places-list places__list tabs__content`,
                  `cities__place-`,
                  `cities__`
                ]}
              />
            </section>
            <div className="cities__right-section">
              <CitiesMap
                currentOffer = {activeOffer}
                offers = {offers}
                styleClassNames = {[
                  `cities`,
                ]}
              />
            </div>
          </div>
        </div>
      ) : (
        <EmptyMain />
      )}
    </main>
  </React.Fragment>;
};

MainPage.propTypes = {
  offers: PropTypes.arrayOf(offerProp.isRequired).isRequired,
  city: PropTypes.string.isRequired,
  listCities: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickTitleCard: PropTypes.func.isRequired,
  onCityClick: PropTypes.func.isRequired,
  isAuthorizationStatus: PropTypes.bool.isRequired,
  onControlAuthorization: PropTypes.func.isRequired,
  emailUser: PropTypes.string.isRequired,
  flagDataIsLoading: PropTypes.bool.isRequired,
  activeOffer: offerProp,
  onChangeActiveOffer: PropTypes.func.isRequired,
  onClickBookmark: PropTypes.func.isRequired,
};

export default MainPage;
