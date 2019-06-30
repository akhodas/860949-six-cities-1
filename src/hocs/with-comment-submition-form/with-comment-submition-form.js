import React from 'react';
import PropTypes from 'prop-types';

const withCommentSubmitionForm = (Component) => {
  class WithCommentSubmitionForm extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: 0,
        commentText: ``,
        blockForm: false,
        successSend: true,
      };

      this._handleFormSubmit = this._handleFormSubmit.bind(this);
      this._handleTextareaTextChange = this._handleTextareaTextChange.bind(this);
      this._handleInputRatingChange = this._handleInputRatingChange.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        rating={this.state.rating}
        commentText={this.state.commentText}
        blockForm={this.state.blockForm}
        successSend={this.state.successSend}
        onSubmit={this._handleFormSubmit}
        onChangeText={this._handleTextareaTextChange}
        onChangeRating={this._handleInputRatingChange}
      />;
    }

    _handleTextareaTextChange(evt) {
      this.setState({
        commentText: evt.target.value,
      });
    }

    _handleInputRatingChange(evt) {
      this.setState({
        rating: +evt.target.value,
      });
    }

    _handleFormSubmit(evt) {
      evt.preventDefault();

      this.setState({blockForm: true});

      this.props.onSendComment({
        rating: this.state.rating,
        comment: this.state.commentText,
      })
      .then((response) => {
        if (response.status === 403) {
          this.props.history.push(`/login`);
        } else {
          this.setState({
            rating: 0,
            commentText: ``,
            blockForm: false,
            successSend: true,
          });
        }
      })
      .catch(() => {
        this.setState({
          blockForm: false,
          successSend: false,
        });
      });
    }
  }

  WithCommentSubmitionForm.propTypes = {
    onSendComment: PropTypes.func.isRequired,
    history: PropTypes.object,
  };

  return WithCommentSubmitionForm;
};

export default withCommentSubmitionForm;
