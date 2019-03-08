const mysql = require('mysql');

const config = require('../config/mysql_config')

const pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
})
let query = (sql,values) => {
    return new Promise((resolve,reject) => {
        pool.getConnection((err,connection) => {
            err && reject(err)
            console.log('数据库连接成功 😄  😄  😄')
            connection.query(sql,values,(err,rows) => {
                err ? reject(err) : resolve(rows)

            })
            connection.release()
        })
    })
}


let createTable = (sql) => query(sql,[]) ;

let registerUser = (values) => {
    let sql = `insert into users set name=?,password=?,avator=?,moment=?`
    return query(sql,values)
}

let showAllUsers = () => {
    let sql = 'select * from user';
    return query(sql);
}
module.exports = {
    query,
    createTable,
    registerUser,
    showAllUsers
}