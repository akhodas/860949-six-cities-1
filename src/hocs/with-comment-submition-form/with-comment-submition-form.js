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

    _onChangeText(e) {
      this.setState({
        commentText: e.target.value,
      });
    }

    _onChangeRating(e) {
      this.setState({
        rating: +e.target.value,
      });
    }

    _onSubmit(e) {
      e.preventDefault();

      this.setState({blockForm: true});

      this.props.sendComment({
        rating: this.state.rating,
        comment: this.state.commentText,
      })
      .then(() => {
        this.setState({
          rating: 0,
          commentText: ``,
          blockForm: false,
          successSend: true,
        });
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
    sendComment: PropTypes.func.isRequired,
  };

  return WithCommentSubmitionForm;
};

export default withCommentSubmitionForm;
