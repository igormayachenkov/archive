import mysql from "mysql"

const SYSTEM_DATABASES = new Set([
    'mysql',
    'sys',
    'information_schema', 
    'performance_schema']);


export const getDatabaseList = async function(options){
    let conn = mysql.createConnection(options)
    conn.connect()
    let rows = await query(conn, 'SHOW DATABASES')
    conn.end()

    return rows
        .map(row=>row.Database)
        .filter(db=>!SYSTEM_DATABASES.has(db))
}

// MySQL connection.query wrapped in Promise
// return: results 
const query = async function(conn, sql){
    return new Promise(function(resolve,reject){
        conn.query(sql, function (error, results, fields) {
            if(error) reject(error);
            else resolve(results);
        });
    });
}
