import React from 'react';
import moneypotsStore from '../../utils/store';
import * as actions from '../../utils/actions';

export class Query extends React.Component {
  state = {
    data: moneypotsStore.getData(),
    loading: moneypotsStore.getLoadingState(),
    error: moneypotsStore.getErrorState()
  };

  componentDidMount() {
    actions.fetchData();
    moneypotsStore.on('storeUpdated', this.update);
  }

  componentWillUnmount() {
    moneypotsStore.removeListener('storeUpdated', this.update);
  }

  update = () => {
    this.setState({
      data: moneypotsStore.getData(),
      loading: moneypotsStore.getLoadingState(),
      error: moneypotsStore.getErrorState()
    });
  };

  render() {
    const { children } = this.props;
    return children(this.state);
  }
}
