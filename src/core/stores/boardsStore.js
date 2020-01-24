import { observable, action } from "mobx";
import agent from "../../agent";
import commonStore from "./commonStore";
import tasksStore from "./tasksStore";

class BoardsStore {
  @observable boards = [];
  @observable isLoadingBoards = false;

  @observable board = {};
  @observable users = [];
  @observable columns = [];
  @observable isLoadingBoard = false;

  @action loadBoards = () => {
    this.isLoadingBoards = true;
    return agent.boards
      .getAll()
      .then(
        action(({ data, success }) => {
          this.boards = data.boards;
        })
      )
      .catch(
        action(err => {
          this.errors =
            err.response && err.response.body && err.response.body.errors;
          throw err;
        })
      )
      .finally(
        action(() => {
          this.isLoadingBoards = false;
        })
      );
  };

  @action loadBoard = (boardId, isLoading = true) => {
    if (isLoading) {
      this.isLoadingBoard = true;
    }

    return agent.boards
      .get(boardId)
      .then(
        action(({ data, success }) => {
          this.board = data;
          this.users = data.users;
          this.columns = data.columns;
        })
      )
      .catch(
        action(err => {
          this.errors =
            err.response && err.response.body && err.response.body.errors;
          throw err;
        })
      )
      .finally(
        action(() => {
          if (isLoading) {
            this.isLoadingBoard = false;
          }
        })
      );
  };

  @action addBoard = title => {
    commonStore.isLoading = true;
    return agent.boards.create(title).finally(
      action(() => {
        commonStore.isLoading = false;
      })
    );
  };

  @action deleteBoard(id) {
    commonStore.isLoading = true;
    return agent.boards.delete(id).finally(
      action(() => {
        commonStore.isLoading = false;
      })
    );
  }

  @action updateBoard(id, body) {
    commonStore.isLoading = true;
    return agent.boards.update(id, body).finally(
      action(() => {
        commonStore.isLoading = false;
      })
    );
  }
}

export default new BoardsStore();
