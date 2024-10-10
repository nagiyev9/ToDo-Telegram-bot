// Path And Imports
import taskService from "../services/task-service.js";
import messages from "../utils/messages.js";
import generateTaskID from "../utils/generate-task-id.js";

// Valid Commands
const validCommands = ["/start", "/help", "/myTasks", "/newTask", "/changeStatus", "/deleteTask"];

// Get All User Tasks
const getAllUserTask = async ctx => {
    const user = ctx.from.id;
    try {
        const tasks = await taskService.getAllUserTasks(user);

        if (tasks.length === 0) {
            return ctx.replyWithHTML(`You do not have any tasks yet.`);
        }

        const taskDetails = `
<b>Tasks:</b>
<b>Total Task: ${tasks.length}</b>
<pre>
${tasks.map((task) => `
ID: ${task.taskID}
Name: ${task.name}
Description: ${task.desc}
Expire Date: ${task.expireDate.toLocaleDateString()}
Status: ${task.isCompleated ? '✅ Completed' : '❌ Pending'}
-----------------------------
`).join('')}
</pre>
`;


        ctx.replyWithHTML(taskDetails);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        ctx.replyWithHTML('An error occurred while fetching your tasks. Please try again later.');
    };
};

// Set New Task 
const setTask = async ctx => {
    const user = ctx.from.id;

    const regex = /"([^"]+)"\s+"([^"]+)"\s+(\d{2}-\d{2}-\d{4})/;
    const match = ctx.message.text.match(regex);

    if (!match) {
        return ctx.replyWithHTML('Invalid command format. Please use the following format:\n/newTask "Task Name" "Description" 01-01-2025');
    }

    const [, name, desc, expireDate] = match;

    try {
        if (!name || !expireDate) {
            return await messages.missingData(ctx);
        }

        const checkExist = await taskService.getTaskByName(name);

        if (checkExist) {
            return ctx.replyWithHTML('This task already exists.');
        }

        const [day, month, year] = expireDate.split('-');

        if (day.length !== 2 || month.length !== 2 || year.length !== 4) {
            return ctx.replyWithHTML('Invalid date format. Please try again.\nExample: 01-01-2025');
        }

        const date = new Date(year, month - 1, day);
        const today = new Date();

        if (date <= today) {
            return ctx.replyWithHTML('You cannot set a past date!');
        }

        const newTask = await taskService.setTask({
            taskID: generateTaskID.generateTaskID(),
            name: name,
            desc: desc.length !== 1 ? desc : "No description",
            expireDate: date,
            user: user
        });

        ctx.replyWithHTML('Task added successfully.');
    } catch (error) {
        console.error('Error fetching tasks:', error);
        ctx.replyWithHTML('An error occurred while setting your tasks. Please try again later.');
    }
};

// Change Status
const changeStatus = async ctx => {
    const taskID = ctx.message.text.split(' ')[1];
    try {
        if (!taskID) {
            return ctx.replyWithHTML('Please provide task ID!');
        };

        const checkExist = await taskService.getTaskByTaskID(taskID);

        if (!checkExist) {
            return ctx.replyWithHTML('Task does not exist!');
        };

        await taskService.changeStatus(taskID, checkExist.isCompleated ? false : true);
        ctx.replyWithHTML('Task status changed successfully.');
    } catch (error) {
        console.error('Error changing status:', error);
        ctx.replyWithHTML('An error occurred while changing your task status. Please try again later.');
    };
};

// Delete Task 
const deleteTask = async ctx => {
    const taskID = ctx.message.text.split(' ')[1];
    try {
        if (!taskID) {
            return ctx.replyWithHTML('Please provide task ID!');
        };

        const checkExist = await taskService.getTaskByTaskID(taskID);

        if (!checkExist) {
            return ctx.replyWithHTML('Task does not exist!');
        };

        await taskService.deleteTask(taskID);
        ctx.replyWithHTML('Task deleted successfully.');
    } catch (error) {
        console.error('Error deleting task:', error);
        ctx.replyWithHTML('An error occurred while deleting your task. Please try again later.');
    };
};

// Check Command
const checkCommand = async ctx => {
    const command = ctx.message.text;

    if (command.startsWith('/')) {
        if (!validCommands.includes(command.split(' ')[0])) {
            return await messages.wrongCommand(ctx);
        };
    } else {
        return await messages.wrongText(ctx);
    };
};

export default { getAllUserTask, setTask, changeStatus, deleteTask, checkCommand };