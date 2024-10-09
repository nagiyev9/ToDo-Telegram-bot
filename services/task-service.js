// Path And Import
import Task from "../models/Task.js";

// Get All Tasks 
const getAllUserTasks = async user => {
    return await Task.find({ user: user });
};

// Get Task By Its Name
const getTaskByName = async name => {
    return await Task.findOne({ name: name });
};

// Get Task By TaskID
const getTaskByTaskID = async taskID => {
    return await Task.findOne({ taskID: taskID });
};

// Set New Task
const setTask = async task => {
    return await new Task(task).save();
};

// Edit Task To Compleated
const changeStatus = async (taskID, status) => {
    return await Task.findOneAndUpdate(
        { taskID: taskID },
        { isCompleated: status },
        { new: true }
    );
};

// Delete The Task
const deleteTask = async taskID => {
    return await Task.findOneAndDelete({ taskID: taskID });
};

export default { getAllUserTasks, getTaskByName, getTaskByTaskID, setTask, changeStatus, deleteTask };