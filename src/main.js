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

            registered = await registerLPUs(LPUYPositions);

            if(registered){
                console.log("Succesfully registered");
            }else{
                console.log("Failed to register");
            }
        }

        //reset registered on last call
        if (new Date().getMinutes() === endMinute)
            registered = false;

        console.log();
    });
}


LPUYPositions = [264, 776, 968, 1224, 1288, 1320];
// LPUYPositions = [680]; 
// registerLPUs(LPUYPositions);

registerLPUsAtTime(1, 9, 0, 30);

