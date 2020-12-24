const mariadb = require('mariadb');
const express = require("express");
const http = require("http");
const axios = require("axios");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const apiport = 8000;
const port = 8001;


app.use(express.json());
io.origins('*:*');

const pool = mariadb.createPool({
  // host: 'localhost',
  user: 'clip',
  password: 'board*',
  database: 'clipboard',
  connectionLimit: 100
  // port: 3306 
});

io.on("connection", socket => {
  console.log("client connected")
  socket.on('test', () => {
    console.log("sockets ok")
    socket.emit("test2", '');
  })
  socket.on("disconnect", () => console.log("disconnected"));

});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/clips', function (req, res) {
  pool.getConnection()
    .then(conn => {
      // console.log('connection to db')
      conn.query("SELECT * from Clips")
        .then((rows) => {
          var array = [];
          rows.map(t => {
            array.push(t)
          })
          res.json(array);
          // console.log(array)
        })
        .catch(err => {
          //handle error
          console.log(err);
          // conn.end();
        })

    }).catch(err => {
      console.log('not connected')
      console.log(err)
    });
});

app.post('/clips', function (req, res) {
  console.log(req.body);
  var query = "INSERT INTO Clips(content, time, private)"
    + "values('" + req.body.content + "'  , CURRENT_TIMESTAMP ," + req.body.private + ")"
  console.log(query)
  pool.getConnection()
    .then(conn => {
      conn.query(query)
        .then((row) => {
          res.json(row);
          console.log(row)
        })
    })
    .catch(err => {
      console.log('not connected')
      console.log(err)
    });

})

app.get('/', (req, res) => {
  console.log('ok')
  res.send('server ok')
})

io.listen(port);
console.log('sockets listening on port ', port);

app.listen(apiport);
console.log('listening on port', apiport)