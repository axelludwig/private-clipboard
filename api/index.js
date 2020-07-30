var express = require('express');
var app = express();
var mysql = require('mysql');

const port = 8080;





const mariadb = require('mariadb');
const pool = mariadb.createPool({ host: process.env.DB_HOST, user: process.env.DB_USER, connectionLimit: 5 });
pool.getConnection()
    .then(conn => {

        conn.query("SELECT 1 as val")
            .then(rows => { // rows: [ {val: 1}, meta: ... ]
                return conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
            })
            .then(res => { // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
                conn.release(); // release to pool
            })
            .catch(err => {
                conn.release(); // release to pool
            })

    }).catch(err => {
        //not connected
    });



app.get('/', function (req, res) {
    res.send('hello world')
});

app.listen(port);
console.log('listening on http://localhost:' + port)