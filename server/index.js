const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

//Cargar vista con un middleware
app.use(express.static('client'));

app.get('/home', (request, response) => {
    response.status(200).send('Hola mundo');
});

let messages = [{
    id: 1,
    text: 'Bienvenido al chat privado de Socket.io y NodeJS de Javier Serrano',
    nickname: 'Bot - javiersl'
}];

//Abrimos una conexion al socket
io.on('connection', (socket) => {
    console.log(`El nodo con IP: ${socket.handshake.address} se ha conectado`);

    //Emite un mensaje al cliente
    socket.emit('messages', messages);

    //Recoge el evento del mensaje del cliente
    socket.on('add-message', (data) => {
        messages.push(data);

        //Emite a todos los clientes los mensajes
        io.sockets.emit('messages', messages);
    });
});

server.listen(6677, () => {
    console.log('El servidor está funcionando en el puerto 6677...');
});