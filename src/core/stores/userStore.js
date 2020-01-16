import { observable, action } from "mobx";

class UserStore {
  @observable currentUser = null;

  @action pullUser(user) {
    this.currentUser = user;
  }

  @action forgetUser() {
    window.localStorage.removeItem('token');
    this.currentUser = null;
  }
}

export default new UserStore();
