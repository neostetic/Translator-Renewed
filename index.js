const express = require('express');
const translate = require('translate');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = 3000;
translate.engine = "google";
translate.key = "PUT_YOUR_GOOGLE_API_KEY_HERE";

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    socket.on('translate', async (args) => {
        if (args[2] !== '') {
            const start = async function () {
                return await translate(args[2], {from: args[0], to: args[1]});
            }
            const output = await start();
            console.log(socket.id + "[" + args + "]: " + output);
            io.to(socket.id).emit('translate', output);
        }
    });
});

server.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});