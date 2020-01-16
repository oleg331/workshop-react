import { observable, action, reaction } from "mobx";

class CommonStore {
  @observable appName = "Conduit";
  @observable token = window.localStorage.getItem("token");
  @observable appLoaded = false;

  @observable tags = [];
  @observable isLoadingTags = false;


  constructor() {
    reaction(
      () => this.token,
      token => {
        if (token) {
          window.localStorage.setItem("token", token);
        } else {
          window.localStorage.removeItem("token");
          localStorage.removeItem("currentUser");
        }
      }
    );
  }

  @action setToken(token) {
    this.token = token;
  }

  @action setAppLoaded() {
    this.appLoaded = true;
  }
}

export default new CommonStore();
