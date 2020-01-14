import Task from './model';
import Column from '../column/model';
import CommentService from '../comment/service';

class TaskService {
  static createTask = async (columnId, body) => {
    const task = new Task({
      task: body.task
    });

    await Column.findOne({ _id: columnId }, (err, column) => {
      if (column === null || err) {
        return new Error('Column not found');
      }
      task.save();

      column.tasks.push(task);
      column.save();
    });

    return task.getData();
  };

  static updateTask = async (id, body) => {
    const task = await Task.findOneAndUpdate({ _id: id }, { $set: body });

    TaskService.isTask(task);

    const newTask = task.getData();
    return { ...newTask, task: body.task };
  };

  static deleteTask = async (id) => {
    const task = await Task.findOne({ _id: id });

    TaskService.isTask(task);

    task.comments.forEach(comment => {
      CommentService.deleteAllCommentsInTask(comment._id);
    });

    await Task.deleteOne({ _id: id });
    return {
      status: true,
      id
    };
  };

  static addUser = async (taskId, userId) => {
    const task = await Task.findOne({ _id: taskId });

    if (task.users.indexOf(userId) === -1) {
      task.users.push(userId);
    } else {
      task.users = task.users.filter(id => id != userId);
    }

    await task.save();

    const updatedTask = await Task.findOne({ _id: taskId })
      .populate('users');

    return updatedTask.getData();
  };

  static isTask = async (task) => {
    if (!task) {
      throw Error('Task not found');
    }
  }
}

export default TaskService;
