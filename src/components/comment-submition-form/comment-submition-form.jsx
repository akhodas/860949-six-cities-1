import React from 'react';
import PropTypes from 'prop-types';

const CommentSubmitionForm = (props) => {
  const {
    rating,
    commentText,
    blockForm,
    successSend,
    onChangeRating,
    onChangeText,
    onSubmit
  } = props;
  const stars = [5, 4, 3, 2, 1];

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      {!successSend ? (
        <p className="reviews__help">
          <b className="reviews__text-amount" style={{color: `red`, fontSize: `16px`}}>
            Error sending data!!!
          </b>
        </p>) : null}
      <div className="reviews__rating-form form__rating">
        {stars.map((star) => (
          <React.Fragment key={`key-${star}`}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={star}
              id={`${star}-stars`}
              type="radio"
              onChange={onChangeRating}
              disabled={blockForm}
              checked={rating === star}
            />
            <label
              htmlFor={`${star}-stars`}
              className="reviews__rating-label form__rating-label"
              title="perfect"
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={onChangeText}
        value={commentText}
        disabled={blockForm}
      >{commentText}</textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          <span className="reviews__star">rating</span>
          and describe your stay with at least
          <b className="reviews__text-amount"> 50 </b> and no more than
          <b className="reviews__text-amount"> 300 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!(rating > 0
            && commentText.length >= 50
            && commentText.length <= 300
            && !blockForm)}
          onClick={onSubmit}
        >Submit</button>
      </div>
    </form>
  );
};

CommentSubmitionForm.propTypes = {
  rating: PropTypes.number.isRequired,
  commentText: PropTypes.string.isRequired,
  blockForm: PropTypes.bool.isRequired,
  successSend: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onChangeRating: PropTypes.func.isRequired,
};

export default CommentSubmitionForm;
