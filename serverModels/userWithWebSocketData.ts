import WebSocket from "ws";

export type UserWithWebSocketData = {
    username: string,
    email: string,
    ws:  WebSocket.WebSocket
}