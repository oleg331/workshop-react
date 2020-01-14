
import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import "./Dashboard.scss";
import BoardsList from '../../components/BoardsList/BoardsList';

@inject("boardsStore", "commonStore", "userStore")
@withRouter
@observer
class Dashboard extends React.Component {
  componentDidMount() {
    this.props.boardsStore.loadBoards()
  }

  render() {
    const {
      boards,
      isLoadingBoards
    } = this.props.boardsStore;
    return (
      <div className="wrapper-dashboard">
        <BoardsList
          boards={boards}
          loading={isLoadingBoards}
        />
      </div>
    )
  }
};

export default Dashboard;