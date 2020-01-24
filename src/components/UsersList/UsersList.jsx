
import React from 'react';
import { Chip, Typography } from '@material-ui/core';

import "./UsersList.scss";
import boardsStore from '../../core/stores/boardsStore';
import userStore from '../../core/stores/userStore';

const UsersList = props => {

  const handleDelete = async userId => {
    const { boardId } = props;
    await userStore.toggleOnBoard(boardId, { userId });
    await boardsStore.loadBoard(boardId);
  }

  if (props.users.length === 0) {
    return (
      <>
        <Typography className="users-title" gutterButton variant="h6" component="h4">
          Users:
        </Typography>
        <Chip
          className="users"
          variant="outlined"
          label={"No users yet..."}
        />
      </>
    );
  }

  return (
    <>
    <Typography className="users-title" gutterButton variant="h6" component="h4">
      Users:
    </Typography>
    <div className="users">
      {props.users.map(user => {
        return (
          <Chip
            id={user._id}
            key={user._id}
            className="users"
            label={user.name || user.email}
            onDelete={() => handleDelete(user._id)}
          />
        )
      })}
    </div>
    </>
  )
};

export default UsersList;
