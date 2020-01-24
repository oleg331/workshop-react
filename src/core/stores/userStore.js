import { observable, action } from "mobx";
import agent from "../../agent";

class UserStore {
  @observable currentUser = null;
  @observable usersList = [];

  @action getAllUsers() {
    return agent.users.getAll().then(
      action(({ data, success }) => {
        this.usersList = data.users;
      })
    );
  }

  @action toggleOnBoard(boardId, body) {
    return agent.users.toggleOnBoard(boardId, body);
  }

  @action toggleOnTask(taskId, body) {
    return agent.users.toggleOnTask(taskId, body);
  }

  @action pullUser(user) {
    this.currentUser = user;
  }

  @action forgetUser() {
    window.localStorage.removeItem("token");
    this.currentUser = null;
  }
}

export default new UserStore();
