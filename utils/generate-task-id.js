const generateTaskID = () => {
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    return randomNumber;
};

export default { generateTaskID };