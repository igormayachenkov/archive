import {log} from "./logger.js"
import {config} from "./config.js"
import {spawnSync} from "child_process"


export async function loop(){
    for(const src of config.sources){
        log(src)
        rsyncSrc(src)
    }
}

const rsyncSrc = function(src){
    let child = spawnSync('rsync', [
        '--archive', 
        //'--verbose',
        //'--itemize-changes', 
        '--delete',  
        //'--dry-run', 
        src, config.destination])
    if(child.status==0){
        //console.log(child.stdout.toString())
        //console.log(child.stdout)
    }else throw child.stderr
}