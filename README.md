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
    > git clone git@github.com:igormayachenkov/nanny.git
- install node modules
    > cd nanny    
    npm install
- copy the configuration file to `/etc` dir and correct it according to you tasks
    > cp nanny-config.json /etc   
    nano /etc/nanny-config.json
- start under PM2 management
    > pm2 start index.js --name nanny

Configuration file format
--------------------------
| Parameter                 | Description                                                   |
| :---------------          |:-----------------------------------------------------------   |
| `schedule`                | periodic work settings. Olny daily mode is implemented now    |
|   `.time`  [optional]     | the work will be performet at this time                       |
| `sources`                 | list of `rsync SRC` (files or dirs)                           |
| `destination`             | `rsync DEST` - the backup dir                                 |
| `mysql` [optional]        | schedules the MySQL database backup if present                |
|   `.connection`           | the database connection credentials                           |
|   `.include`  [optional]  | databases to include in the process, all if not present       |
|   `.exclude`  [optional]  | databases to exclude from the process (after include filter run)|
|   `.dump_dir`             | the local dir to store the dumps temporary                    |

