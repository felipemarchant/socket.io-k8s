const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const redisAdapter = require('socket.io-redis');
const redisHost = process.env.REDIS_HOST || 'localhost';
const port = process.env.PORT || 8080;

io.adapter(redisAdapter({ host: redisHost, port: 6379 }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
