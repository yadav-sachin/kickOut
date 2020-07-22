module.exports = function runSocket(io) {
    io.on('connection', (socket) => {
        console.log('Connection ', socket.id);
        socket.on('join', (data) => {
            if(data.gameId)
                socket.join(gameId);
        });
    })
}