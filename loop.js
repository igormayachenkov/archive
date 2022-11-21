import {log} from "./logger.js"
import {config} from "./config.js"
import {spawnSync} from "child_process"
import fs from "fs-extra"
import { getDatabaseList } from "./databases.js"

export async function loop(){
    // ARCHIVE FILES
    for(const src of config.sources){
        rsyncSrc(src)
    }

    // ARHIVE DATABASES
    if(config.mysql){
        const {dump_dir,connection} = config.mysql
        // Prepare dir
        if(!dump_dir) throw "config.mysql.dump_dir is not defined"
        await fs.ensureDirSync(dump_dir)
        await fs.emptyDirSync(dump_dir)
        // Get database list
        const databases = await getDatabaseList(connection)
        // Database
        for(const db of databases){
            dumpDatabase(db, dump_dir, connection)
        }
        // Archive dump_dir
        let dir = dump_dir
        if(dir.endsWith('/')) dir=dir.substring(0,dir.length-1)
        rsyncSrc(dir)

    }
}

const rsyncSrc = function(src){
    log(`archive: ${src}`)

    let child = spawnSync(
        // process
        'rsync', 
        // arguments
        ['--archive', 
           //'--verbose',
           //'--itemize-changes', 
        '--delete',  
        //'--dry-run', 
        src, 
        config.destination],
        // options
        {stdio:[
            'ignore', // stdin
            'ignore', // stdout
            'pipe'    // stderr
        ]}

    )
    // Check the rusult
    if(child.status!=0) throw child.stderr
}

// mysqldump intrasite -u root -p > intrasite.sql
const dumpDatabase = function(database,dir,connection){
    log(`dump db: ${database}`)

    let path = dir + (dir.endsWith('/')?'':'/') + database + '.sql'
    const out = fs.openSync(path, 'w');

    let child = spawnSync(
        'mysqldump',
        // arguments
        ['-u',  connection.user,
        `--password=${connection.password}`,
        database],
        // options
        {stdio:[
            'ignore', // stdin
            out,      // stdout
            'pipe'    // stderr
        ]}
    )
    //console.log('child',child)

    // Check the rusult
    if(child.status!=0) throw child.stderr
}

// let child = spawnSync(
//     'ls',
//     ['-l'],// arguments
//     // options
//     {stdio:[
//         'ignore', // stdin
//         out,      // stdout
//         'pipe'    // stderr
//     ]}
// )
//console.log('child',child)

