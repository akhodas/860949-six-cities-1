import React from 'react';
import PropTypes from 'prop-types';

import Comment from '../comment/comment.jsx';

const DEFAULT_COUNT_COMMENTS = 10;


const ListComments = (props) => {

  const {
    comments,
  } = props;

  return (
    <React.Fragment>
      <h2 className="reviews__title">
        Reviews &middot;
        <span className="reviews__amount">
          {comments.length}
        </span>
      </h2>
      <ul className="reviews__list">
        {comments.slice(0, DEFAULT_COUNT_COMMENTS).map((comment) =>
          <Comment
            key={comment.id}
            comment={comment}
          />
        )}
      </ul>
    </React.Fragment>
  );
};

ListComments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ListComments;
