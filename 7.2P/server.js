const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Static files
app.use(express.static(__dirname + '/public'));

// Random data function
function sendRandomData() {
    return {
        num1: Math.floor(Math.random() * 100),
        num2: Math.floor(Math.random() * 500),
        time: new Date().toLocaleTimeString()
    };
}

io.on('connection', (socket) => {
    console.log('User connected');

    // Send data every 3 seconds
    const myInterval = setInterval(() => {
        socket.emit('server-data', sendRandomData());
    }, 3000);

    // Listen for client request
    socket.on('request-data', () => {
        console.log('Client clicked button');
        socket.emit('server-data', sendRandomData());
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
        clearInterval(myInterval);
    });
});

http.listen(3000, () => {
    console.log('Server is running on port 3000');
});
