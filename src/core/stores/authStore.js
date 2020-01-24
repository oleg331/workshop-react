import { observable, action, computed } from "mobx";
import agent from "../../agent";
import userStore from "./userStore";
import commonStore from "./commonStore";

class AuthStore {
  @observable inProgress = false;
  @observable errors = undefined;

  @observable values = {
    username: "",
    email: "",
    password: ""
  };

  @action setUsername(username) {
    this.values.username = username;
  }

  @action setEmail(email) {
    this.values.email = email;
  }

  @action setPassword(password) {
    this.values.password = password;
  }

  @action reset() {
    this.values.username = "";
    this.values.email = "";
    this.values.password = "";
    localStorage.removeItem('user');
  }

  @action setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  @action login() {
    this.inProgress = true;
    this.errors = undefined;
    return agent.auth.login(this.values)
      .then(({ data }) => {
        commonStore.setToken(data.token);
        this.setUser(data.user);
        return data.user;
      })
      .then(user => userStore.pullUser(user))
      .catch(
        action(err => {
          this.errors =
            err.response && err.response.body && err.response.body.errors;
          throw err;
        })
      )
      .then(
        action(() => {
          this.inProgress = false;
        })
      );
  }

  @action register() {
    this.inProgress = true;
    this.errors = undefined;
    return agent.auth.register(this.values)
      .finally(
        action(() => {
          this.inProgress = false;
        })
      );
  }

  @action logout() {
    commonStore.setToken(null);
    userStore.forgetUser();
    this.reset();
    return Promise.resolve();
  }
}

export default new AuthStore();
