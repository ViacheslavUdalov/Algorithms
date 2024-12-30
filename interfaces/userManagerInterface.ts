import WebSocket from "ws";
import {UserWithWebSocketData} from "../serverModels/userWithWebSocketData.js";


export interface UserManagerInterface {
    users: UserWithWebSocketData[],

    addUser(user: { ws: WebSocket.WebSocket; email: any; username: any }): void
    removeUser(username: string) : void
    findUserByUsername(username: string): UserWithWebSocketData | undefined,
    findUserByEmail(email: string): UserWithWebSocketData | undefined,
}