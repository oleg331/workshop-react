import appState from "./app-state";
import authStore from "./authStore";
import boardsStore from "./boardsStore";
import commonStore from "./commonStore";
import userStore from "./userStore";

import forms from "./forms";
export default {
  appState,
  authStore,
  boardsStore,
  commonStore,
  userStore,
  ...forms
}
