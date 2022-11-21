import {log} from "./logger.js"
import {config, loadConfig} from "./config.js"
import {loop} from "./loop.js"

const LOOP_INTERVAL = 2000

console.log('------------------------------------------------------------------------')
console.log('|                           ARCHIVE-SYSTEM                             |')

async function loopWrapper(){
    log('LOOP STARTED')
    try{
        await loop()        
    }catch(err){
        log(err)
    }
    log('LOOP FINISHED')
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