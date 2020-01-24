import appState from "./app-state";
import authStore from "./authStore";
import boardsStore from "./boardsStore";
import commonStore from "./commonStore";
import userStore from "./userStore";
import forms from "./forms";

import { createBrowserHistory } from "history";
import { RouterStore, syncHistoryWithStore } from "mobx-react-router";

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();

const history = syncHistoryWithStore(browserHistory, routingStore);

export default {
  appState,
  authStore,
  boardsStore,
  commonStore,
  userStore,
  history,
  ...forms
}
