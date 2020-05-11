const http = require('http');
const port = 8080;
const WebSocketServer = require('websocket').server;
const server = http.createServer();
var fs = require('fs');
var json = require("./users.json");
var users = json;

const msgTypes = {
    Register: 0,
    Login: 1
}

server.listen(port);
console.log("server is listening on port " + port)

const wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', function (request) {
    const connection = request.accept(null, request.origin);
    connection.on('message', function (message) {
        connection.sendUTF(messageManager(message.utf8Data));
    });
    connection.on('close', function (reasonCode, description) {
        console.log('Client has disconnected.');
    });
});

function messageManager(messageRecived) {
    var convertedMessage = JSON.parse(messageRecived);
    var answer;
    switch (convertedMessage.type) {
        case msgTypes.Login:
            if (checkuser(convertedMessage.username, convertedMessage.password)) {
                answer = "logged successfully as " + convertedMessage.username;
            }
            else {
                answer = "wrong credentials";
            }
            break;
        case msgTypes.Register:
            if (addUser(convertedMessage.username, convertedMessage.password)) {
                answer = "registred successfully as " + convertedMessage.username;
            }
            else {
                answer = convertedMessage.username + " is alredy taken";
            }
            break;
        default:
            answer = "message type not recognized";
            break;

    }
    console.log("updated list", users);
    return answer;
}

function addUser(username, password) {
    var index = users.findIndex(p => p.username == username);
    if (index == -1 && username != "") {
        users.push({ username, password });
        fs.writeFileSync("./users.json", JSON.stringify(users), 'utf8');
        return true;
    }
    return false;
}

function checkuser(username, password) {
    var index = users.findIndex(p => p.username == username);
    if (index != -1)
        if (password == users[index].password) return true
    return false;
}