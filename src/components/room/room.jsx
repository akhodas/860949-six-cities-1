import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import ListComments from '../list-comments/list-comments.jsx';
import ListOffers from '../list-offers/list-offers.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.js';
import CitiesMap from '../cities-map/cities-map.jsx';


const ListOffersWrapped = withActiveItem(ListOffers);

const Room = (props) => {

  const {
    emailUser,
    controlAuthorization,
    isAuthorizationStatus,
    flagDataIsLoading,
    offer,
    comments,
    offersNear,
  } = props;

  return (
    <React.Fragment>
      <div style={{display: `none`}}>
        <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path></symbol></svg>
      </div>

      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img
                  className="header__logo"
                  src="../img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
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

      {flagDataIsLoading ?
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {offer.images.slice(0, 6).map((image) => (
                  <div key={image + offer.id} className="property__image-wrapper">
                    <img className="property__image" src={image} alt="Photo studio"/>
                  </div>
                ))}
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {offer.isPremium ?
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
                  : ``}
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {offer.title}
                  </h1>
                  <button className="property__bookmark-button button" type="button">
                    <svg className="property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: `${100 * offer.rating / 5}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{offer.rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {offer.type}
                  </li>
                  <li className="property__feature property__feature--bedoffers">
                    {offer.bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {offer.maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{offer.price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {offer.goods.map((item) => (
                      <li key={item + offer.id} className="property__inside-item">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                      <img className="property__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                    </div>
                    <span className="property__user-name">
                      {offer.host.name}
                    </span>
                    {offer.host.isPro ? (
                      <span className="property__user-status">
                        Pro
                      </span>
                    ) : ``}
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {offer.description}
                    </p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  <ListComments
                    comments={comments}
                  />
                </section>
              </div>
            </div>

            <div style={{width: `990px`, margin: `auto`}}>
              <CitiesMap
                currentOffer = {offer}
                offers = {offersNear}
                styleClassNames = {[
                  `property`,
                ]}
              />
            </div>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <ListOffersWrapped
                offers = {offersNear}
                onClickTitleCard = {(history, id) => {
                  history.push(`/offer/${id}`);
                  // eslint-disable-next-line no-console
                  console.log(`CLICK on card NEAR #${id}`);
                }}
                styleClassNames = {[
                  `near-places__list places__list`,
                  `near-places__`,
                  `near-places__`
                ]}
              />
            </section>
          </div>
        </main>
        :
        <main className="page__main page__main--property">
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
    </React.Fragment>
  );
};

Room.propTypes = {
  emailUser: PropTypes.string.isRequired,
  isAuthorizationStatus: PropTypes.bool.isRequired,
  controlAuthorization: PropTypes.func.isRequired,
  flagDataIsLoading: PropTypes.bool.isRequired,
  offer: PropTypes.object,
  offersNear: PropTypes.array.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Room;
