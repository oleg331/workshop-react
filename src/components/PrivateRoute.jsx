import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject('userStore', 'commonStore')
@observer
class PrivateRoute extends React.Component {
  render() {
    const { userStore, ...restProps } = this.props;
    if (localStorage.getItem('token') || userStore.currentUser) {
      return <Route {...restProps} />;
    }
    return <Redirect to="/auth" />;
  }
}

export default PrivateRoute;