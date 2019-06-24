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
      };

      this._onSubmit = this._onSubmit.bind(this);
      this._onChangeText = this._onChangeText.bind(this);
      this._onChangeRating = this._onChangeRating.bind(this);
    }

    render() {
      const {successSend} = this.props;

      return <Component
        {...this.props}
        rating={this.state.rating}
        commentText={this.state.commentText}
        blockForm={this.state.blockForm}
        successSend={successSend}
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

      this.props.sendComment({
        rating: this.state.rating,
        comment: this.state.commentText,
      });

      if (this.state.rating > 3) {
        this.setState({
          rating: 0,
          commentText: ``,
          blockForm: false,
        });
      } else {
        this.setState({
          blockForm: true,
        });
      }

      setTimeout(() => {
        this.setState({blockForm: false});
      }, 3000);
    }
  }

  WithCommentSubmitionForm.propTypes = {
    sendComment: PropTypes.func.isRequired,
    successSend: PropTypes.bool.isRequired,
  };

  return WithCommentSubmitionForm;
};

export default withCommentSubmitionForm;
