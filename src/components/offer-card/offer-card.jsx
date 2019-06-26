import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {offerProp} from '../../interface-prop-types/interface-prop-types';

const OfferCard = (props) => {
  const {
    history,
    offer,
    onClickTitleCard,
    onClickImageCard,
    onChangeActiveOffer,
    onClickBookmark,
    onHoverCard,
    styleClassNames
  } = props;
  const {id, previewImage, isPremium, price, title, type, rating, isFavorite} = offer;

  return <article
    className={`${styleClassNames[1]}card place-card`}
    onMouseEnter={onHoverCard}>
    {isPremium ?
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      : null}
    <div className={`${styleClassNames[2]}image-wrapper place-card__image-wrapper`}>
      <a href="#" onClick={(e) => {
        e.preventDefault();
        if (onClickImageCard) {
          onClickImageCard(id);
        } else {
          onClickTitleCard(history, id);
        }
        if (onChangeActiveOffer) {
          onChangeActiveOffer(offer);
        }
      }}>
        <img
          className="place-card__image"
          src={previewImage}
          width={styleClassNames[3] ? `150` : `260`}
          height={styleClassNames[3] ? `110` : `200`}
          alt="Place image">
        </img>
      </a>
    </div>
    <div className={`${styleClassNames[3] ? styleClassNames[3] : null} place-card__info`}>
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button
          className={isFavorite ?
            `place-card__bookmark-button place-card__bookmark-button--active button`
            : `place-card__bookmark-button button`
          }
          type="button"
          onClick={() => {
            onClickBookmark({
              idOffer: id,
              favoriteStatus: +!isFavorite,
              objHistory: history,
            });
          }}
        >
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
          onClickTitleCard(history, id);
        }}>{title}</a>
      </h2>
      <p className="place-card__type">{type}</p>
    </div>
  </article>;
};

OfferCard.propTypes = {
  offer: offerProp.isRequired,
  onClickTitleCard: PropTypes.func.isRequired,
  onClickImageCard: PropTypes.func,
  onChangeActiveOffer: PropTypes.func,
  onClickBookmark: PropTypes.func.isRequired,
  onHoverCard: PropTypes.func.isRequired,
  history: PropTypes.object,
  styleClassNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export {OfferCard};

export default withRouter(OfferCard);
