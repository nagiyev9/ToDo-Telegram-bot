const sendStartMessage = async (ctx) => {
    const helperCommand = `<b>Welcome to Just Do It Bot. I'm here to help you manage your tasks effectively with this To-Do Bot. Whether it's simple daily tasks or long-term goals, you can create, update, and track your to-dos easily. Let's get started on organizing your tasks!</b>\n
<b>/start</b> - <i>Start the bot</i>\n
<b>/help</b> - <i>Command list</i>\n
<b>/set</b> - <i>Create New Task</i>`;

    try {
        await ctx.reply(helperCommand, {
            parse_mode: 'HTML'
        });
        console.log('Start message sent successfully');
    } catch (error) {
        console.error('Error sending message:', error);
    };
};

export default sendStartMessage;
