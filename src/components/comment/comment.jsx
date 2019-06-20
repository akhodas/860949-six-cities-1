import React from 'react';
import PropTypes from 'prop-types';

const Month = {
  0: `January`,
  1: `February`,
  2: `March`,
  3: `April`,
  4: `May`,
  5: `June`,
  6: `July`,
  7: `August`,
  8: `September`,
  9: `October`,
  10: `November`,
  11: `December`,
};

const Comment = (props) => {

  const {
    comment,
  } = props;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={comment.user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">
          {comment.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${(comment.rating * 100 / 5)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment.comment}
        </p>
        <time className="reviews__time" dateTime="2019-04-24">
          {`${Month[comment.date.getMonth()]} ${comment.date.getFullYear()}`}
        </time>
      </div>
    </li>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      isPro: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }).isRequired,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    date: PropTypes.object.isRequired,
  }).isRequired,
};

export default Comment;
