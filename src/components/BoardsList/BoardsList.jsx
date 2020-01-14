
import React from 'react';

import Board from '../Board/Board';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import "./BoardsList.scss";

const BoardsList = props => {
  if (props.loading && props.boards.length === 0) {
    return (
      <LoadingSpinner />
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
    <>
      {props.boards.map(board => {
        return (
          <Board board={board} key={board._id} />
        )
      })}
    </>
  )
};

export default BoardsList;