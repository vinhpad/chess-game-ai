import io from 'socket.io-client';

const URL = 'http://localhost:8000/';

const socket = io(URL);

var socketId;

socket.on("createNewGame", statusUpdate => {
    console.log("Create new game with User: " + statusUpdate.userName 
    + ", Game Id: " + statusUpdate.gameId
    + ", Socket Id:" + statusUpdate.socketId);
    socketId = statusUpdate.socketId;
});

export {
    socket,
    socketId
};
