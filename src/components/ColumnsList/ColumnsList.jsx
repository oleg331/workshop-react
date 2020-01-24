
import React from 'react';

import "./ColumnsList.scss";
import Column from '../Column/Column';

const ColumnsList = props => {
  const { boardId } = props;

  if (props.columns.length === 0) {
    return (
      <div className="wrapper-columns">
        No columns yet...
      </div>
    );
  }

  return (
    <div className="wrapper-columns">
      {props.columns.map(column => {
        return (
          <Column boardId={boardId} column={column} key={column._id} />
        )
      })}
    </div>
  )
};

export default ColumnsList;