import {log} from "./logger.js"
import {config, loadConfig} from "./config.js"
import {loop} from "./loop.js"

const LOOP_INTERVAL = 60000000

console.log('------------------------------------------------------------------------')
console.log('|                           ARCHIVE-SYSTEM                             |')

async function loopWrapper(){
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