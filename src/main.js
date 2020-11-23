const schedule = require('node-schedule');
const { registerLPUs } = require("./register")


async function registerLPUsAtTime(targetDay, targetHour, startMinute, endMinute){
    
    let rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = targetDay
    rule.hour = targetHour
    rule.second = 1

    let minutes = [];
    for(let i = startMinute; i < endMinute+1; i++) 
        minutes.push(i);
    rule.minute = minutes;

    let registered = false;
    let j = schedule.scheduleJob(rule, async function(){
        if(!registered){
            console.log("Trying to register...");

            registered = await registerLPUs(LPUYPositions, true);

            if(registered){
                console.log("Succesfully registered");
            }else{
                console.log("Failed to register");
            }
            console.log();
        }

        //reset registered on last call
        if (new Date().getMinutes() === endMinute)
            registered = false;
    });
}


// LPUYPositions = [264, 776, 968, 1224, 1288, 1320];
LPUYPositions = [872]; 
// registerLPUs(LPUYPositions, true);

registerLPUsAtTime(1, 12, 0, 59);

