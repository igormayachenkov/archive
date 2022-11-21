import {log} from "./logger.js"


export async function loop(){
    log('loop')
    throw "Error: loop error"
}