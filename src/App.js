import React from "react";
import { Route } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { LinearProgress } from "@material-ui/core";

import pages from "./pages";

import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header/Header";

import "./App.css";

@inject("userStore", "commonStore")
@observer
class App extends React.Component {
  componentWillMount() {
    if (!this.props.commonStore.token) {
      this.props.commonStore.setAppLoaded();
    }
  }

  render() {
    return (
      <>
        {this.props.commonStore.isLoading && <LinearProgress />}
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
