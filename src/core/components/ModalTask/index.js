import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Slide,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Icon,
  IconButton
} from "@material-ui/core";

import boardsStore from "../../stores/boardsStore";
import columnsStore from "../../stores/columnsStore";
import tasksStore from "../../stores/tasksStore";
import userStore from "../../stores/userStore";
import authStore from "../../stores/authStore";
import { observable } from "mobx";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalTask(props) {
  const [open, setOpen] = React.useState(false);
  const [commentValue, setCommentValue] = React.useState();
  const [task, setTask] = React.useState(props.task);

  const handleSubmit = async () => {
    await tasksStore.addComment(task._id, commentValue);
    await boardsStore.loadBoard(props.boardId, false);
    setCommentValue('');
  };

  const handleDeleteComment = async commentId => {
    await tasksStore.deleteComment(commentId, { taskId: task._id });
    await boardsStore.loadBoard(props.boardId, false);
  }

  const handleChangeField = e => {
    setCommentValue(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button size="small" color="primary" onClick={handleClickOpen}>
        View
      </Button>
      <Dialog
        open={open}
        fullWidth={true}
        maxWidth={"sm"}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle onClose={handleClose} id="form-dialog-title">
          {task.task}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="value"
            label="Enter comment"
            type="text"
            fullWidth
            onChange={handleChangeField}
            value={commentValue}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            Add comment
          </Button>
        </DialogActions>
        <DialogContent>
          <List>
            {task.comments && props.task.comments.reverse().map(user => {
              return (
                <ListItem>
                  <ListItemAvatar>
                    <Avatar></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${user.name} (${user.email})`}
                    secondary={user.comment}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteComment(user._id)}
                    >
                      <Icon>delete</Icon>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
}
