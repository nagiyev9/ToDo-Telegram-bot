// Path
import express from 'express';
import dotenv from 'dotenv';
import { Telegraf } from 'telegraf';

// Config
dotenv.config();

// PORT 
const PORT = process.env.PORT || 3000;

// App
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Imports
import connect from "./database/db.js";
import sendStartMessage from "./utils/start-message.js";

// Initialize Bot
const bot = new Telegraf(process.env.TOKEN);

// Start Command
bot.start(async (ctx) => {
    await sendStartMessage(ctx);
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