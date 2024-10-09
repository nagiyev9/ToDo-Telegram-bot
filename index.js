// Path
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import dotenv from 'dotenv';
import { Telegraf } from 'telegraf';

// Config
dotenv.config();

// PORT 
const PORT = process.env.PORT || 3000;

// App
const app = express();

// Define __dirname in ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'page', 'HomePage.html'));
});

// Imports
import connect from "./database/db.js";
import sendStartMessage from "./utils/start-message.js";
import taskController from "./controllers/task-controller.js";

// Initialize Bot
const bot = new Telegraf(process.env.TOKEN);

// Start Command
bot.start(async (ctx) => {
    await sendStartMessage(ctx);
});

bot.command('help', async (ctx) => {
    await sendStartMessage(ctx);
});

bot.command('myTasks', async (ctx) => {
    await taskController.getAllUserTask(ctx);
});

bot.command('newTask', async (ctx) => {
    await taskController.setTask(ctx);
    await taskController.getAllUserTask(ctx);
});

bot.command('deleteTask', async (ctx) => {
    await taskController.deleteTask(ctx);
    await taskController.getAllUserTask(ctx);
});

bot.command('changeStatus', async (ctx) => {
    await taskController.changeStatus(ctx);
    await taskController.getAllUserTask(ctx);
});

// Launch Bot
bot.launch().then(() => {
    console.log('Bot has been launched');
}).catch(err => {
    console.error('Error launching the bot:', err);
});

// App Listen 
app.listen(PORT, () => {
    connect();
    console.log(`Server is working on ${PORT} port`);
});

// Properly handle shutdown signals
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));