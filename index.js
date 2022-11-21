import {log} from "./logger.js"
import {config, loadConfig} from "./config.js"
import {loop} from "./loop.js"


const LOOP_INTERVAL = 60000 //1 min
let lastSync = null


console.log('------------------------------------------------------------------------')
console.log('|                           ARCHIVE-SYSTEM                             |')

async function loopWrapper(){
    // VERIFY DATE/TIME
    if(lastSync){
        let now = new Date()
        if(now.getDay()==lastSync.getDay()) return
        if(config.time){
            let parts = config.time.split(':')
            if(parts.length==2 || parts.length==3){
                let time = 3600 * Number(parts[0])+
                             60 * Number(parts[1])+
                            (parts.length==3 ? Number(parts[3]) : 0)
                let timeNow = 
                           3600 * now.getHours() +
                             60 * now.getMinutes() +
                                  now.getSeconds()
                if(timeNow<time) return
            }
        }

    }

    // DO SYNC
    lastSync = new Date()
    log('>>> LOOP STARTED >>>')
    try{
        await loop()      
        log('<<< LOOP FINISHED WITH SUCCESS :-) <<<')
    }catch(err){
        console.log(err.toString())
        log('<<< LOOP FINISHED WITH ERROR :-( <<<')
    }
}

async function main(){
    // READ CONFIG    
    loadConfig()
    console.log('CONFIG:', config);

    // START LOOP
    setImmediate(loopWrapper);
    setInterval(loopWrapper, LOOP_INTERVAL);
}

try{
    await main()
}catch(err){
    console.log(err)
}