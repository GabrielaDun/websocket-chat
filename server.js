
const express = require('express');

const app = express();
const server = app.listen(8000, () => {
  console.log('Server is running on Port:', 8000)
});
const io = socket(server);

const path = require('path')
const socket = require('socket.io');

app.use(express.static(path.join(__dirname, '/client')));

const message = [];

io.on('connection', (socket) => {
    console.log('New client! Its id – ' + socket.id);
    socket.on('message', (message) => 
    { console.log('Oh, I\'ve got something from ' + socket.id)
    message.push(message);
    socket.broadcast.emit('message', message);
    });

    socket.on('disconnect', () => {console.log('Oh, socket ' + socket.id + ' left')})
    console.log('I\'ve added a listener on message event \n');
  });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'))
})



