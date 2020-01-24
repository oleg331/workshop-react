import * as React from "react";
import { inject, observer } from "mobx-react";
import { Toolbar, Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";

import "./Header.scss";

@inject('userStore', 'commonStore', 'authStore')
@withRouter
@observer
class Header extends React.Component {
  constructor(props) {
    super();

    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.authStore.logout();
    this.props.history.replace("/auth");
  }

  render() {
    const { userStore } = this.props;

    if (userStore.currentUser || localStorage.getItem('token')) {
      return (
        <Toolbar>
          <div className="wrapper">
            <h1>
              Trello Project <small>(2.0.1)</small>
            </h1>
            <Button
              onClick={this.logout}
              variant="contained"
              color="primary"
            >
              Logout
            </Button>
          </div>
        </Toolbar>
      );
    }

    return (
      <Toolbar>
        <div className="wrapper">
          <h1>
            Authorization page
          </h1>
        </div>
      </Toolbar>
    );
  }
};

export default Header;
