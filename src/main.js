const { registerLPUs } = require("./register")

async function registerLPUsAtTime(targetDay, targetHour, targetMinute){
    while(true){
        let date = new Date();

        let day = date.getDay();
        let hour = date.getHours();
        let minute = date.getMinutes();
        
        if(day === targetDay && hour === targetHour && minute === targetMinute){
            registerLPUs(LPUYPositions);
        }
        console.log(minute);

        await sleep(60000);
    }
}
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}  


LPUYPositions = [264, 776, 968, 1224, 1288, 1320];
// LPUYPositions = [680]; 

registerLPUsAtTime(1, 9, 5);

