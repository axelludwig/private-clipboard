var express = require('express');
var app = express();
const mariadb = require('mariadb');

const port = 8080;

const pool = mariadb.createPool({
    // host: 'localhost',
    user: 'clip',
    password: 'board*',
    // database: 'clipboard',
    // connectionLimit: 10,
    // port: 3306 
});


//https://chartio.com/resources/tutorials/how-to-grant-all-privileges-on-a-database-in-mysql/
//https://www.daniloaz.com/en/how-to-create-a-user-in-mysql-mariadb-and-grant-permissions-on-a-specific-database/

pool.getConnection()
    .then(conn => {
        conn.query("SELECT * from clipboard.Clips")
            .then((rows) => {
                // console.log(rows); //[ {val: 1}, meta: ... ]
                rows.map(t => {
                    console.log(t)
                })
                // //Table must have been created before 
                // // " CREATE TABLE myTable (id int, val varchar(255)) "
                // return conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
            })
            .then((res) => {
                // console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
                conn.end();
            })
            .catch(err => {
                //handle error
                console.log(err);
                conn.end();
            })

    }).catch(err => {
        console.log('not connected')
        console.log(err)
    });



app.get('/', function (req, res) {
    res.send('hello world')
});

app.listen(port);
console.log('listening on http://localhost:' + port)