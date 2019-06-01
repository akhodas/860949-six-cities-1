import React from 'react';
import PropTypes from 'prop-types';

const OfferCard = (props) => {
  const {offer, onClickTitleCard, onClickImageCard, onHoverCard} = props;
  const {id, previewImage, isPremium, price, title, type, rating} = offer;

  return <article
    className="cities__place-card place-card"
    onMouseEnter={onHoverCard}>
    {isPremium ?
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      : null}
    <div className="cities__image-wrapper place-card__image-wrapper">
      <a href="#" onClick={(e) => {
        e.preventDefault();
        onClickImageCard(id);
      }}>
        <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image"></img>
      </a>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className="place-card__bookmark-button button" type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: `${(rating * 100 / 5)}%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <a href="#" onClick={(e) => {
          e.preventDefault();
          onClickTitleCard(id);
        }}>{title}</a>
      </h2>
      <p className="place-card__type">{type}</p>
    </div>
  </article>;
};

OfferCard.propTypes = {
  offer: PropTypes.shape({
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
  }).isRequired,
  onClickTitleCard: PropTypes.func.isRequired,
  onClickImageCard: PropTypes.func.isRequired,
  onHoverCard: PropTypes.func.isRequired,
};

export default OfferCard;
