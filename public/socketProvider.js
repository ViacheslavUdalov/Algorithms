
let socket;

function getSocket() {
    if (!socket) {
        socket = new WebSocket("ws://localhost:8080");
    }
    return socket;
}
export default getSocket;
