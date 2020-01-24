import React from "react";
import { Card, CardContent, Typography, CardActions, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import "./Task.scss";
import ModalAction from "../../core/components/ModalAction";
import ModalTask from "../../core/components/ModalTask";

import boardsStore from "../../core/stores/boardsStore";
import tasksStore from "../../core/stores/tasksStore";

const Task = props => {
  const { _id, task } = props.task;
  const { boardId } = props;

  const btnOptions = {
    variant: "outlined",
    color: "primary"
  }

  const modalData = {
    taskId: _id,
    boardId
  }

  const deleteTask = async (e) => {
    e.preventDefault();

    await tasksStore.deleteTask(_id);
    await boardsStore.loadBoard(boardId);
  }

  return (
    <Card className="task">
      <CardContent>
        <Typography className="task-title" gutterButton variant="h6" component="h2">
          {task}
        </Typography>
      </CardContent>
      <CardActions>
        <ModalTask
          task={props.task}
          boardId={boardId}
        />

        <ModalAction
          action="edit"
          type="task"
          title="Edit"
          value={task}
          btnOptions={btnOptions}
          modalData={modalData}
        />

        <Button onClick={deleteTask} size="small" color="primary">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Task;
