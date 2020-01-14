import * as React from "react";
import { Card, CardContent, Typography, CardActions, Button } from "@material-ui/core";

import "./Board.scss";
import UsersList from "../UsersList/UsersList";

const Board = props => {
  const { title, users, } = props.board;
  return (
    <Card className="board">
      <CardContent>
        <Typography className="board-title" gutterButton variant="h5" component="h2">
          {title}
        </Typography>

        <Typography className="board-users-title" gutterButton variant="h6" component="h4">
          Users:
        </Typography>

        <UsersList
          users={users}
        />
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          View
        </Button>
        <Button size="small" color="primary">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Board;