import mysql from "mysql"

export const getDatabaseList = async function(options){
    let conn = mysql.createConnection(options)
    conn.connect()
    let rows = await query(conn, 'SHOW DATABASES')
    conn.end()

    return rows
        .map(row=>row.Database)
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
