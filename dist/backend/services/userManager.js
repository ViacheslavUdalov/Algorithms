class UserManager {
    constructor() {
        this.users = [];
    }
    addUser(user) {
        this.users.push(user);
        console.log(`add - this.users`, this.users);
    }
    removeUser(username) {
        this.users = this.users.filter(item => item.username !== username);
        console.log(`remove - this.users`, this.users);
    }
    findUserByUsername(username) {
        return this.users.find(user => user.username === username);
    }
    findUserByEmail(email) {
        return this.users.find(user => user.email === email);
    }
}
export default UserManager;
