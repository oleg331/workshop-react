import mongoose, { Schema } from 'mongoose';

const TaskSchema = new Schema(
  {
    task: String,
    isCompleted: Boolean,
    users: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }]
  },
  {
    timestamps: true
  }
);

TaskSchema.methods.getData = function () {
  return {
    _id: this._id,
    task: this.task,
    users: this.users,
    comments: this.comments,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

const Task = mongoose.model('Task', TaskSchema);

export default Task;
