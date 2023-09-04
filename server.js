
const express = require('express');

const app = express();
const server = app.listen(8000, () => {
  console.log('Server is running on Port:', 8000)
});
const io = socket(server);

const path = require('path')
const socket = require('socket.io');

app.use(express.static(path.join(__dirname, '/client')));

const messages = [];

const users = [];

io.on('connection', (socket) => {
    console.log('New client! Its id – ' + socket.id);

    socket.on('message', (message) => { 
        console.log('Oh, I\'ve got something from ' + socket.id)
        messages.push(message);
        socket.broadcast.emit('message', message);
    });

    socket.on('login', ( name => {
        console.log('User ' + name + ' logged with id: ' + socket.id)
        users.push({name, id: socket.id});
        socket.broadcast.emit('message', {author: 'Chat bot', content: 'User ${name} has joined the conversation!'});
    }))

    socket.on('disconnect', () => {
        const userLeft = users.findIndex(user => {
            return user.id === socket.id
        })
        if (userLeft !== -1 ) {
            console.log('User ' + users[i].name + ' has logged off');
            socket.broadcast.emit('message', {author: 'Chat bot', content: `User ${users[i].name} has left the conversation... `})
            users.splice(i, 1);
            console.log(users)
        }
    })
    console.log('I\'ve added a listener on message event \n');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'))
})



