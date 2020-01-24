
import React from 'react';

import "./TasksList.scss";
import Task from '../Task/Task';

const TasksList = props => {
  const { boardId, columnId } = props;

  if (props.tasks.length === 0) {
    return (
      <div className="wrapper-tasks">
        No tasks yet...
      </div>
    );
  }

  return (
    <div className="wrapper-tasks">
      {props.tasks.map(task => {
        return (
          <Task
            boardId={boardId}
            columnId={columnId}
            task={task}
            key={task._id}
          />
        )
      })}
    </div>
  )
};

export default TasksList;
