var express = require('express');
var mariadb = require('mariadb');
var axios = require('axios')

const cors = require('cors')


var port = 8080;

var app = express();
app.use(express.json());
app.use(cors);

let http = require('http');
let server = http.Server(app);
let socketIO = require('socket.io');
let io = socketIO(server);


// const pool = mariadb.createPool({
//     // host: 'localhost',
//     user: 'clip',
//     password: 'board*',
//     database: 'clipboard',
//     // connectionLimit: 10,
//     // port: 3306 
// });


//https://chartio.com/resources/tutorials/how-to-grant-all-privileges-on-a-database-in-mysql/
//https://www.daniloaz.com/en/how-to-create-a-user-in-mysql-mariadb-and-grant-permissions-on-a-specific-database/


io.on('connection', (socket) => {
    console.log('socket connection starts');
    var user;

    socket.on('connectUser', (username) => {
        user = usersController.saveUsername(username);
        io.emit('newUserConnected', username);
        console.log('user ' + username + ' connected');
    })
})





// app.get('/clips', function (req, res) {
//     pool.getConnection()
//         .then(conn => {
//             conn.query("SELECT * from Clips")
//                 .then((rows) => {
//                     console.log('ok')
//                     // console.log(rows); //[ {val: 1}, meta: ... ]
//                     rows.map(t => {
//                         res.json(t);
//                         console.log(t)
//                     })
//                 })
//                 // .then((res) => {
//                 //     // console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
//                 //     conn.end();
//                 // })
//                 .catch(err => {
//                     //handle error
//                     console.log(err);
//                     conn.end();
//                 })

//         }).catch(err => {
//             console.log('not connected')
//             console.log(err)
//         });
// });

app.post('/clips', function (req, res) {
    console.log(req.body);

    // pool.getConnection()
    //     .then(conn => {
    //         conn.query("INSERT INTO Clips(content, tisme, private)  values('test', CURRENT_TIMESTAMP, false)")
    //             .then((rows) => {
    //                 console.log('ok')
    //                 // console.log(rows); //[ {val: 1}, meta: ... ]
    //                 res.json(t);
    //                 console.log(t)
    //                 // //Table must have been created before 
    //                 // // " CREATE TABLE myTable (id int, val varchar(255)) "
    //                 // return conn.query("INSERT INTO myTasble value (?, ?)", [1, "mariadb"]);
    //             })
    //             .then((res) => {
    //                 // console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
    //                 conn.end();
    //             })
    //             .catch(err => {
    //                 //handle error
    //                 console.log(err);
    //                 conn.end();
    //             })

    //     }).catch(err => {
    //         console.log('not connected')
    //         console.log(err)
    //     });
})

app.get('/', (req, res) => {
    console.log('ok')
    res.send('ok')
})

app.listen(port);
console.log('listening on http://localhost:' + port)