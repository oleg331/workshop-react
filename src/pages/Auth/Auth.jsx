import React from "react";
import SwipeableViews from "react-swipeable-views";
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box
} from "@material-ui/core";
import { inject, observer } from "mobx-react";

import "./Auth.scss";
import AuthForm from "./AuthForm";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Typography>
  );
}

@inject('loginFormStore', 'registerFormStore')
@observer
class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0
    };

    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.handleChangeTabIndex = this.handleChangeTabIndex.bind(this);
  }

  handleChangeTab(event, newValue) {
    this.setState({ value: newValue });
  };

  handleChangeTabIndex(index) {
    this.setState({ value: index });
  };

  render() {
    const { loginFormStore, registerFormStore } = this.props;
    let { value } = this.state;

    return (
      <div className="auth-container">
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChangeTab}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
        </AppBar>
        <SwipeableViews index={value} onChangeIndex={this.handleChangeTabIndex}>
          <TabPanel value={value} index={0}>
            <AuthForm formStore={loginFormStore} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AuthForm formStore={registerFormStore} />
          </TabPanel>
        </SwipeableViews>
      </div>
    );
  }
}

export default Auth;