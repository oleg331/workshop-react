import * as React from "react";
import { inject, observer } from "mobx-react";
import { Toolbar, Button } from "@material-ui/core";

import "./Header.scss";

const LoggedOutView = props => {
  if (!props.currentUser) {
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
  return null;
}

const LoggedInView = props => {
  if (props.currentUser) {
    return (
      <Toolbar>
        <div className="wrapper">
          <h1>
            Trello Project <small>(2.0.1)</small>
          </h1>
          <Button variant="contained" color="primary">
            Logout
          </Button>
        </div>
      </Toolbar>
    );
  }
  return null;
}

@inject('userStore', 'commonStore')
@observer
class Header extends React.Component {
  render() {
    return (
      <>
        <LoggedOutView currentUser={this.props.userStore.currentUser} />
        <LoggedInView currentUser={this.props.userStore.currentUser} />
      </>
    );
  }
};

export default Header;