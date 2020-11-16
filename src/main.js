const { registerLPUs } = require("./register")

async function registerLPUsAtTime(targetDay, targetHour, targetMinute, tries){
    let triesLeft = tries;
    let shouldTry = false;
    while(true){
        let date = new Date();
        let day = date.getDay();
        let hour = date.getHours();
        let minute = date.getMinutes();
        
        console.log(`Current time: ${day}, ${hour}, ${minute}`);
        if((day === targetDay && hour === targetHour && minute === targetMinute) && !shouldTry){
            console.log("Correct time, registering for LPUs");
            console.log();
            console.log();
            shouldTry = true;
        }
        else if(!shouldTry){
            console.log("Wrong time, sleeping for 1 minute");
        }


        if(shouldTry){
            console.log("----------");
            let res = await registerLPUs(LPUYPositions);
            console.log("----------");

            triesLeft--;
            if(res === true || triesLeft === 0){
                shouldTry = false;
                triesLeft = tries;
            }else{
                console.log("Error while registering, trying again in 1 minute")
                console.log();
                console.log();
            }
        }
        
        console.log();

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
// registerLPUs(LPUYPositions);

registerLPUsAtTime(1, 17, 26, 1);

