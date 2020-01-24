
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Grid, CircularProgress } from '@material-ui/core';

import "./BoardDetail.scss";
import UsersList from '../../components/UsersList/UsersList';
import ColumnsList from '../../components/ColumnsList/ColumnsList';
import ModalAction from '../../core/components/ModalAction';

@inject("boardsStore", "commonStore", "userStore")
@observer
class BoardDetail extends React.Component {
  constructor(props) {
    super();

    this.state = {
      btnOptions: {
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
    const { userStore, boardsStore, match } = this.props;
    boardsStore.loadBoard(match.params.id);
    userStore.getAllUsers();
  }

  render() {
    const {
      board,
      users,
      columns,
      isLoadingBoard
    } = this.props.boardsStore;

    const { usersList } = this.props.userStore;

    const { 
      btnOptions,
    } = this.state;

    const modalData = { boardId: board._id }

    if (isLoadingBoard) {
      return (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <CircularProgress />
        </Grid>
      )
    }

    return (
      <div className="board-detail-container">
        <div className="board-detail-header">
          <h2>{board.title}</h2>

          <ModalAction
            action="edit"
            type="board"
            title="Edit title"
            value={board.title}
            modalData={modalData}
            btnOptions={btnOptions}
          />

          <ModalAction
            action="add"
            type="column"
            title="Add column"
            modalData={modalData}
            btnOptions={btnOptions}
          />

          <UsersList users={users} boardId={board._id} />

          <ModalAction
            action="add"
            type="user"
            title="Toggle user"
            modalData={{
              ...modalData,
              users: usersList
            }}
            btnOptions={btnOptions}
          />

        </div>

        <ColumnsList boardId={board._id} columns={columns} />
      </div>
    )
  }
};

export default BoardDetail;
