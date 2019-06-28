import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {offerProp} from '../../interface-prop-types/interface-prop-types';
import ListOffers from '../list-offers/list-offers.jsx';


const Favorites = (props) => {
  const {
    emailUser,
    favoriteOffers,
    onClickTitleCard,
    onClickBookmark,
  } = props;

  return (
    <React.Fragment>
      <div style={{display: `none`}}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="icon-arrow-select" viewBox="0 0 7 4">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z">
            </path>
          </symbol>
          <symbol id="icon-bookmark" viewBox="0 0 17 18">
            <path
              d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z">
            </path>
          </symbol>
          <symbol id="icon-star" viewBox="0 0 13 12">
            <path
              fillRule="evenodd"
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
              <Link className="header__logo-link" to="/">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">
                      {emailUser}
                    </span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {favoriteOffers.length ? (
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {favoriteOffers.map((city) => {
                  return (
                    <li className="favorites__locations-items" key={city[0].city.name}>
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#">
                            <span>{city[0].city.name}</span>
                          </a>
                        </div>
                      </div>

                      <ListOffers
                        offers = {city}
                        onClickTitleCard = {onClickTitleCard}
                        onClickBookmark = {onClickBookmark}
                        styleClassNames = {[
                          `favorites__places`,
                          `favorites__`,
                          `favorites__`,
                          `favorites__card-info `,
                        ]}
                      />

                    </li>
                  );
                })}
              </ul>
            </section>
          </div>
        </main>
      ) : (
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan yor future trips.</p>
              </div>
            </section>
          </div>
        </main>
      )}

      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </Link>
      </footer>
    </React.Fragment>
  );
};

Favorites.propTypes = {
  favoriteOffers: PropTypes.arrayOf(PropTypes.arrayOf(offerProp)),
  emailUser: PropTypes.string.isRequired,
  onClickTitleCard: PropTypes.func.isRequired,
  onClickBookmark: PropTypes.func.isRequired,
};

export default Favorites;
