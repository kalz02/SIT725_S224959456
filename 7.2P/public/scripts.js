var socket = io();

// Get elements
var val1 = document.getElementById('value1');
var val2 = document.getElementById('value2');
var statusText = document.getElementById('socket-status');
var timeText = document.getElementById('time');
var btn = document.getElementById('send-btn');

// Listen for connection
socket.on('connect', function() {
    statusText.innerText = 'Connected';
    statusText.style.color = 'green';
});

socket.on('disconnect', function() {
    statusText.innerText = 'Disconnected';
    statusText.style.color = 'red';
});

// Listen for data from server
socket.on('server-data', function(data) {
    console.log('Got data:', data);
    val1.innerText = data.num1;
    val2.innerText = data.num2;
    timeText.innerText = data.time;
});

// Button click to request data
btn.addEventListener('click', function() {
    socket.emit('request-data');
});
