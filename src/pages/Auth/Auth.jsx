import React from "react";
import SwipeableViews from "react-swipeable-views";
import {
  makeStyles,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box
} from "@material-ui/core";

// Components
import Login from "./Login/Login";
import Register from "./Register/Register";

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

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    margin: "100px auto"
  }
}));

export default function Auth() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeTabIndex = index => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
      </AppBar>
      <SwipeableViews index={value} onChangeIndex={handleChangeTabIndex}>
        <TabPanel value={value} index={0}>
          <Login />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Register />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
