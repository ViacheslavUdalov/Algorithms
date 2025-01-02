import WebSocket from "ws";
import {UserManagerInterface} from "../interfaces/userManagerInterface.js";
import {UserWithWebSocketData} from "../serverModels/userWithWebSocketData.js";

class UserManager implements UserManagerInterface{
        users: UserWithWebSocketData[] = [];

    addUser(user: { ws: WebSocket.WebSocket; email: any; username: any }): void {
        this.users.push(user)
     console.log(`add - this.users`, this.users);   
    }
    removeUser(username: string) {
        this.users = this.users.filter(item => item.username !== username);
        console.log(`remove - this.users`, this.users);
    }
    findUserByUsername(username: string) {
       return this.users.find(user => user.username === username);
    }  
    findUserByEmail(email: string) { 
       return this.users.find(user => user.email === email);
    }
    
}
export default UserManager;