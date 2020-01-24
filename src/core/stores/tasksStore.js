import { action, observable } from "mobx";
import agent from "../../agent";
import commonStore from "./commonStore";
import authStore from "./authStore";

class TasksStore {
  @observable comments = [];

  @action addTask = (id, body) => {
    commonStore.isLoading = true;
    return agent.tasks.add(id, body).finally(
      action(() => {
        commonStore.isLoading = false;
      })
    );
  };

  @action deleteTask(id) {
    commonStore.isLoading = true;
    return agent.tasks.delete(id).finally(
      action(() => {
        commonStore.isLoading = false;
      })
    );
  }

  @action updateTask(id, body) {
    commonStore.isLoading = true;
    return agent.tasks.update(id, body).finally(
      action(() => {
        commonStore.isLoading = false;
      })
    );
  }

  @action addComment(id, comment) {
    commonStore.isLoading = true;
    const userInfo = JSON.parse(localStorage.getItem('user'));

    const options = {
      comment,
      ...userInfo
    }

    return agent.comments.create(id, options).finally(
      action(() => {
        commonStore.isLoading = false;
      })
    )
  }

  @action deleteComment(id, body) {
    commonStore.isLoading = true;
    return agent.comments.delete(id, body).finally(
      action(() => {
        commonStore.isLoading = false;
      })
    )
  }
}

export default new TasksStore();
