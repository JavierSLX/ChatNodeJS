let socket = io.connect('http://192.168.1.69:6677', {'forceNew': true});

//Obtiene el metodo emitido del servidor
socket.on('messages', (data) => {
    console.log(data);
    render(data);
});

//Muestra la info del servidor
function render(data)
{
    let html = data.map((message, index) => {
        return (`
            <div class="message">
                <strong>${message.nickname}</strong> dice:
                <p>${message.text}</p>
            </div>
            `);
    }).join(' ');

    document.getElementById('messages').innerHTML = html;
}

//Agrega un mensaje
function addMessage(e)
{
    let message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };

    document.getElementById('nickname').style.display = 'none';
    socket.emit('add-message', message);
    return false;
}