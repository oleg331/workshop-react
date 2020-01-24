
import React from 'react';

import Board from '../Board/Board';
import { CircularProgress, Grid } from '@material-ui/core';

import "./BoardsList.scss";

const BoardsList = props => {
  if (props.loading && props.boards.length === 0) {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <CircularProgress />
      </Grid>
    );
  }

  if (props.boards.length === 0) {
    return (
      <div className="wrapper-dashboard">
        No boards yet...
        </div>
    );
  }

  return (
    <div className="wrapper-dashboard">
      {props.boards.map(board => {
        return (
          <Board board={board} key={board._id} />
        )
      })}
    </div>
  )
};

export default BoardsList;