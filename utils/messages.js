const missingData = async (ctx) => {
    const message = `<b>Please provide name, expire Date (description is optional if you do not add description write " ").</b>\n
Example: /newTask Task Name, Task Description, 01-01-2025\n
Or\n
Expamle: /newTask Task Name, " ", 01-01-2025\n
If you do not want to add description use the second one` 

    try {
        await ctx.replyWithHTML(message);
    } catch (error) {
        console.log(error);
    };
};

const wrongCommand = async (ctx) => {
    try {
        await ctx.replyWithHTML('Wrong command! Please use <b>/help</b> to get the list of available commands.');
    } catch (error) {
        console.log(error);
    };
};

const wrongText = async (ctx) => {
    try {
        await ctx.replyWithHTML('Unkown text! Please use <b>/help</b> to get the list of available commands.');
    } catch (error) {
        console.log(error);
    };
};

export default { missingData, wrongCommand, wrongText };
