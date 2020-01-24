import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Select, MenuItem } from "@material-ui/core";

import "./ModalAction.scss";

import boardsStore from "../../stores/boardsStore";
import columnsStore from "../../stores/columnsStore";
import tasksStore from "../../stores/tasksStore";
import userStore from "../../stores/userStore";

export default function ModalAction(props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(props.value || "");
  const [users, setUsers] = React.useState([]);

  const handleSubmit = async () => {
    const { action, type } = props;
    const { modalData } = props.modalData ? props : {};

    // switch for edit
    if (action === "edit") {
      switch (type) {
        case "board": {
          const { boardId } = modalData;
          await boardsStore.updateBoard(boardId, { title: value });
          await boardsStore.loadBoard(boardId);
          setOpen(false);
          setValue("");
          break;
        }
        case "user": {
          console.log("add user");
          break;
        }
        case "column": {
          const { columnId, boardId } = modalData;
          await columnsStore.updateColumn(columnId, { title: value });
          await boardsStore.loadBoard(boardId);
          setOpen(false);
          setValue("");
          break;
        }
        case "task": {
          const { taskId, boardId } = modalData;
          await tasksStore.updateTask(taskId, { task: value });
          await boardsStore.loadBoard(boardId);
          break;
        }
        default:
      }

      return false;
    }

    // switch for add
    switch (type) {
      case "board": {
        await boardsStore.addBoard(value);
        await boardsStore.loadBoards();
        setOpen(false);
        setValue("");
        break;
      }

      case "user": {
        const { boardId } = modalData;
        await userStore.toggleOnBoard(boardId, { userId: value });
        await boardsStore.loadBoard(boardId);
        break;
      }

      case "column": {
        const { boardId } = modalData;
        await columnsStore.addColumn(boardId, { title: value });
        await boardsStore.loadBoard(boardId);
        setOpen(false);
        setValue("");
        break;
      }

      case "task": {
        const { boardId, columnId } = props.modalData;
        await tasksStore.addTask(columnId, { task: value });
        await boardsStore.loadBoard(boardId);
        setOpen(false);
        setValue("");
        break;
      }
      default:
    }
  };

  const handleChangeField = e => {
    setValue(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="action-btn">
      <Button {...props.btnOptions} onClick={handleClickOpen}>
        {props.title}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          {props.type === "user" ? (
            <Select
              fullWidth
              displayEmpty
              value={value}
              onChange={handleChangeField}
            >
              {props.modalData.users &&
                props.modalData.users.map(user => {
                  return (
                    <MenuItem value={user._id} key={user._id}>
                      {user.name}
                    </MenuItem>
                  );
                })}
            </Select>
          ) : (
            <TextField
              autoFocus
              margin="dense"
              id="value"
              label="value"
              type="text"
              fullWidth
              onChange={handleChangeField}
              value={value}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {props.title}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
