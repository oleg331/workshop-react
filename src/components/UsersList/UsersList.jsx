
import React from 'react';
import { Chip } from '@material-ui/core';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import "./UsersList.scss";

const UsersList = props => {
  if (props.loading && props.boards.length === 0) {
    return (
      <LoadingSpinner />
    );
  }

  if (props.users.length === 0) {
    return (
      <Chip
        className="board-user"
        variant="outlined"
        label={"No users yet..."}
      />
    );
  }

  return (
    <div className="users">
      {props.users.map(user => {
        return (
          <Chip
            className="board-user"
            key={user._id}
            label={user.name || user.email}
          />
        )
      })}
    </div>
  )
};

export default UsersList;
