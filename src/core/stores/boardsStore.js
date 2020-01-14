import { observable, action } from "mobx";
import agent from "../../agent";

class BoardsStore {
  @observable boards = [];
  @observable isLoadingBoards = false;

  @action loadBoards() {
    this.isLoadingBoards = true;
    return agent.boards.getAll()
      .then(
        action(({ data, success}) => {
          this.boards = data.boards
        })
      )
      .finally(
        action(() => {
          this.isLoadingBoards = false;
        })
      )
  }
}

export default new BoardsStore();
