import fs from "fs-extra"

export const config = {}

const CONFIG_PATH = '/etc/nanny-config.json'

export function loadConfig(){
    // Get config filename
    //let configfile = process.argv[2]
    //if(!configfile) throw 'ERROR: configfile is not specified (the first process argument)'

    // Read the file
    let rawdata = fs.readFileSync(CONFIG_PATH);
    let json = JSON.parse(rawdata);
    Object.assign(config, json)

    // VERIFY 
    if(!config.schedule) throw "config: parameter shedule is indefined"
    if(!config.sources) throw "config: parameter sources is indefined"
    if(!config.destination) throw "config: parameter destination is indefined"
    if(!config.schedule) throw "config: parameter shedule is indefined"
    if(config.mysql){
        if(!config.mysql.connection) throw "config: parameter mysql.connection is indefined"
        if(!config.mysql.dump_dir)   throw "config: parameter mysql.dump_dir is indefined"
    }
}


