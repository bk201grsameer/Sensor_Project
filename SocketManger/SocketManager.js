class SocketManager {
    constructor() {
        // total users
        this.users = []
    }
    // add users
    add(socket) {
        this.users.push(socket)
    }
    // remove socket
    remove(socket) {
        this.users = this.users.filter((user) => user.id != socket.id)
    }
    // display
    display() {
        console.log(`[+] Total Users : ${this.users.length} `)
    }
}
module.exports.SocketManager = SocketManager