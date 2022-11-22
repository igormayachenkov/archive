Another backup scheduler for Node+PM2 lovers
=================================================
How does it work?
-----------------
The main idea is to copy the server data to another place periodically. Performs the next tasks in a loop:
- make a dump of the selected MySQL databases 
- copy the specified folders (including the dump) on the backup server 

Used software (must be installed)
---------------------------------
- `rsync` as the main tool for file synchronization
- `mysqldump` for MySQL database content archivation
- `pm2` for keeping the application online

Installation
----------------
- download the code from github
    > git clone git@github.com:igormayachenkov/nunny.git
- install node modules
    > cd nunny    
    npm install
- copy the configuration file to `/etc` dir and correct it according to you tasks
    > cp nunny-config.json /etc   
    nano /etc/nunny-config.json
- start under PM2 management
    > pm2 start index.js --name nunny

Configuration file format
--------------------------
| Parameter                 | Description                                                   |
| :---------------          |:-----------------------------------------------------------   |
| `schedule`                | periodic work settings. Olny daily mode is implemented now    |
|   `.time`                 | the work will be performet at this time                       |
| `sources`                 | list of `rsync SRC` (files or dirs)                           |
| `destination`             | `rsync DEST` - the backup dir                                 |
| `database` [optional]     |  schedules the database backup if present                     |
|   `.connection`           | the database connection credentials                           |
|   `.include`  [optional]  | databases to include in the process, all if not present       |
|   `.exclude`  [optional]  | databases to exclude from the process (after include filter run)|
|   `.dump_dir`             | the local dir to store the dumps                              |

