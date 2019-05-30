import React from 'react';

const withActiveItem = (Component) => {
  class WithActiveItem extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: {},
      };

      this._handleCardActivate = this._handleCardActivate.bind(this);
    }

    render() {
      const {activeItem} = this.state;

      return <Component
        {...this.props}
        activeItem = {activeItem}
        onItemActivate = {(item, e) => {
          this._handleCardActivate(item, e);
        }}
      />;
    }

    _handleCardActivate(item, e) {
      this.setState({activeItem: item});
      // eslint-disable-next-line no-console
      console.log(`Activate card #${item.id}`);
      // eslint-disable-next-line no-console
      console.log(`Title last ativate card: "${
        this.state.activeItem.title}"!!! (because "setState" asynk)`);
      // eslint-disable-next-line no-console
      console.log(`event: "${e}"`);
    }
  }

  WithActiveItem.propTypes = {};

  return WithActiveItem;
};

export default withActiveItem;