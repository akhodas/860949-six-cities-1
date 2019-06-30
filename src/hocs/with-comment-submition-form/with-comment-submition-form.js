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

      this._onSubmit = this._onSubmit.bind(this);
      this._onChangeText = this._onChangeText.bind(this);
      this._onChangeRating = this._onChangeRating.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        rating={this.state.rating}
        commentText={this.state.commentText}
        blockForm={this.state.blockForm}
        successSend={this.state.successSend}
        onSubmit={this._onSubmit}
        onChangeText={this._onChangeText}
        onChangeRating={this._onChangeRating}
      />;
    }

    _onChangeText(evt) {
      this.setState({
        commentText: evt.target.value,
      });
    }

    _onChangeRating(evt) {
      this.setState({
        rating: +evt.target.value,
      });
    }

    _onSubmit(evt) {
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
