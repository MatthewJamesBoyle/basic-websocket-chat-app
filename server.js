const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const db = require('./db');

app.get('/',  (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', msg => {
        io.emit('chat message', msg);
        db.saveMessage(msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(3000, '0.0.0.0', () => {
    console.log('listening on *:3000');
});