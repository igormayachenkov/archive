import fs from "fs-extra"

export const config = {}

export function loadConfig(){
    // Get config filename
    let configfile = process.argv[2]
    if(!configfile) throw 'ERROR: configfile is not specified (the first process argument)'

    // Read the file
    let rawdata = fs.readFileSync(configfile);
    let json = JSON.parse(rawdata);
    Object.assign(config,json)

    // VERIFY 
}


