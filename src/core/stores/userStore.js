import { observable, action } from "mobx";
import agent from "../../agent";

class UserStore {
  // TODO: currentUser with auth
  @observable currentUser = true;
  @observable loadingUser = null;
  @observable updatingUser = null;

  @action pullUser() {
    this.loadingUser = true;
    return agent.Auth.current()
      .then(
        action(({ user }) => {
          this.currentUser = user;
        })
      )
      .finally(
        action(() => {
          this.loadingUser = false;
        })
      );
  }

  @action updateUser(newUser) {
    this.updatingUser = true;
    return agent.Auth.save(newUser)
      .then(
        action(({ user }) => {
          this.currentUser = user;
        })
      )
      .finally(
        action(() => {
          this.updatingUser = false;
        })
      );
  }

  @action forgetUser() {
    this.currentUser = null;
  }
}

export default new UserStore();
