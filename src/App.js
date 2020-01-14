import React from "react";
import { Route, withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";

import pages from "./pages";

import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header/Header";

import "./App.css";

@inject("userStore", "commonStore")
@withRouter
@observer
class App extends React.Component {
  componentWillMount() {
    if (!this.props.commonStore.token) {
      this.props.commonStore.setAppLoaded();
    }
  }

  componentDidMount() {
    // if (this.props.commonStore.token) {
    //   this.props.userStore
    //     .pullUser()
    //     .finally(() => this.props.commonStore.setAppLoaded());
    // }
  }

  render() {
    return (
      <>
        <Header />
        {pages.map(page =>
          page.name === "Auth" ? (
            <Route {...page.routeProps} key={page.name} />
          ) : (
            <PrivateRoute {...page.routeProps} key={page.name} />
          )
        )}
      </>
    );
  }
}

export default App;
