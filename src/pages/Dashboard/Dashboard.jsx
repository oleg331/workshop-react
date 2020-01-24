
import React from 'react';
import { inject, observer } from 'mobx-react';

import "./Dashboard.scss";
import BoardsList from '../../components/BoardsList/BoardsList';
import ModalAction from '../../core/components/ModalAction';

@inject("boardsStore", "commonStore", "userStore")
@observer
class Dashboard extends React.Component {
  constructor() {
    super();

    this.state = {
      btnBoardAddOptions: {
        buttonText: "Add board",
        variant: "outlined",
        color: "primary"
      }
    }

    this.handleAddBoard = this.handleAddBoard.bind(this);
  }

  handleAddBoard(e) {
    e.preventDefault();

    this.setState({
      boardAddOpened: true
    })
  }

  componentDidMount() {
    this.props.boardsStore.loadBoards();
  }

  render() {
    const {
      boards,
      isLoadingBoards
    } = this.props.boardsStore;

    const { btnBoardAddOptions } = this.state;

    return (
      <>
      <div className="add-board-container">
        <ModalAction
          type="board"
          title="Add board"
          btnOptions={btnBoardAddOptions}
        />
      </div>

        <BoardsList
          boards={boards}
          loading={isLoadingBoards}
        />
      </>
    )
  }
};

export default Dashboard;