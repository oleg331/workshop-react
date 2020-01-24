import { action } from "mobx";
import agent from "../../agent";
import commonStore from "./commonStore";

class ColumnsStore {

  @action addColumn = (id, body) => {
    commonStore.isLoading = true;
    return agent.columns.add(id, body).finally(
      action(() => {
        commonStore.isLoading = false;
      })
    );
  };

  @action deleteColumn(id) {
    commonStore.isLoading = true;
    return agent.columns.delete(id).finally(
      action(() => {
        commonStore.isLoading = false;
      })
    );
  }

  @action updateColumn(id, body) {
    commonStore.isLoading = true;
    return agent.columns.update(id, body).finally(
      action(() => {
        commonStore.isLoading = false;
      })
    );
  }
}

export default new ColumnsStore();
