const sendStartMessage = async (ctx) => {
    const helperCommand = `<b>Welcome to Just Do It Bot. I'm here to help you manage your tasks effectively with this To-Do Bot. Whether it's simple daily tasks or long-term goals, you can create, update, and track your to-dos easily. Let's get started on organizing your tasks!</b>\n
<b>/help</b> - Command list
<b>/myTasks</b> - Your Task List\n
<b>/newTask "Task Name" "Description" expireDate</b> - Create New Task
<b>Example:</b> /newTask "Task Name", "Task Description", 01-01-2025
<b>Note:</b> Description is Optional. If you do not want to add description write just " "\n
<b>/changeStatus ID</b> - Change task status
<b>Example: /changeStatus 1012</b>\n
<b>/deleteTask ID</b> - Delete Task
<b>Example: /deleteTask 1012</b>`;

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