import { WebSocketServer } from 'ws';
const wss = new WebSocketServer({ port: 8080 });
export function handleConnection(socket) {
    socket.on('error', console.error);
    socket.on('message', (e) => {
        // console.log('Pong: %s',e );
        if (e.toString() === "ping") {
            socket.send('pong');
        }
    });
}
;
wss.on('connection', handleConnection);
//# sourceMappingURL=index.js.map