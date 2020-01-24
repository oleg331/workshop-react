import React from "react";
import { Card, CardContent, Typography, CardActions, Button } from "@material-ui/core";

import "./Board.scss";
import UsersList from "../UsersList/UsersList";
import { Link } from "react-router-dom";
import boardsStore from "../../core/stores/boardsStore";

const Board = props => {
  const { _id, title, users, } = props.board;

  const deleteBoard = async (e) => {
    e.preventDefault();

    await boardsStore.deleteBoard(_id);
    await boardsStore.loadBoards();
  }

  return (
    <Card className="board">
      <CardContent>
        <Typography className="board-title" gutterButton variant="h5" component="h2">
          {title}
        </Typography>

        <UsersList
          users={users}
        />
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/board/${_id}`} size="small" color="primary">
          View
        </Button>
        <Button onClick={deleteBoard} size="small" color="primary">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Board;
