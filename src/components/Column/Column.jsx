import React from "react";
import { Card, CardContent, Typography, CardActions, Button } from "@material-ui/core";

import boardsStore from "../../core/stores/boardsStore";
import columnsStore from "../../core/stores/columnsStore";

import "./Column.scss";
import TasksList from "../TasksList/TasksList";
import ModalAction from "../../core/components/ModalAction";

const Column = props => {
  const { _id, title, tasks } = props.column;
  const { boardId } = props;

  const btnOptions = {
    variant: "outlined",
    color: "primary"
  };

  const modalData = {
    columnId: _id,
    boardId
  };

  const deleteColumn = async e => {
    e.preventDefault();

    await columnsStore.deleteColumn(_id)
    await boardsStore.loadBoard(boardId);
  }

  return (
    <Card className="column">
      <CardContent>
        <Typography className="column-title" gutterButton variant="h4" component="h2">
          {title}
        </Typography>
        <Typography className="column-title" gutterButton variant="h4" component="h2">
          <CardActions className="column-actions">
            <ModalAction
              action="edit"
              type="column"
              title="Edit"
              value={title}
              btnOptions={btnOptions}
              modalData={modalData}
            />

            <Button onClick={deleteColumn} size="small" color="primary">
              Delete
            </Button>
            
            <ModalAction
              action="add"
              type="task"
              title="Add"
              btnOptions={btnOptions}
              modalData={modalData}
            />
          </CardActions>
        </Typography>

        <TasksList
          boardId={boardId}
          columnId={_id}
          tasks={tasks}
        />
      </CardContent>
    </Card>
  );
};

export default Column;
