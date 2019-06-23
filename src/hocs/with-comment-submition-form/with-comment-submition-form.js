import React from 'react';
import PropTypes from 'prop-types';

const withCommentSubmitionForm = (Component) => {
  class WithCommentSubmitionForm extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        raiting: 0,
        commentText: ``,
        blockForm: false,
      };

      this._onSubmit = this._onSubmit.bind(this);
      this._onChangeText = this._onChangeText.bind(this);
      this._onChangeRaiting = this._onChangeRaiting.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        raiting={this.state.raiting}
        commentText={this.state.commentText}
        blockForm={this.state.blockForm}
        onSubmit={this._onSubmit}
        onChangeText={this._onChangeText}
        onChangeRaiting={this._onChangeRaiting}
      />;
    }

    _onChangeText(e) {
      this.setState({
        commentText: e.target.value,
      });
    }

    _onChangeRaiting(e) {
      this.setState({
        raiting: +e.target.value,
      });
    }

    _onSubmit(e) {
      e.preventDefault();
      this.setState({blockForm: true});
      if (this.state.commentText.length >= 100) {
        this.setState({
          raiting: 0,
          commentText: ``,
          blockForm: false,
        });
        console.log(true);
      } else {
        this.setState({
          blockForm: true,
        });
        console.log(false);
      }
      console.log(this.state.commentText.length);
      console.log(this.state.raiting);

      setTimeout(() => {
        this.setState({blockForm: false});
      }, 3000);
      // this.props.sendComment({
      //   raiting: this.state.raiting,
      //   commentText: this.state.commentText,
      // });
    }
  }

  WithCommentSubmitionForm.propTypes = {
    sendComment: PropTypes.func.isRequired,
  };

  return WithCommentSubmitionForm;
};

export default withCommentSubmitionForm;
