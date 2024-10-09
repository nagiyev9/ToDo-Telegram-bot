// Path
import mongoose from "mongoose";

// Schema
const TaskSchema = mongoose.Schema({
    taskID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: false,
    },
    expireDate: {
        type: Date,
        required: true
    },
    isCompleated: {
        type: Boolean,
        required: true,
        default: false
    },
    user: {
        type: String,
        required: true
    }
});

// Model
const Task = mongoose.model('tasks', TaskSchema);

export default Task;