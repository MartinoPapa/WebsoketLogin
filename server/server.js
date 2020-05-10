const http = require('http');
const port = 8080;
const WebSocketServer = require('websocket').server;
const server = http.createServer();
var fs = require('fs');

var json = require("./users.json");
var users = json;

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
    var answer;
    var username = messageRecived.split(":")[1];
    var password = messageRecived.split(":")[2];
    if (messageRecived.includes("new")) {
        if (addUser(username, password)) {
            answer = "registred successfully as " + username;
        }
        else {
            answer = username + " is alredy taken";
        }
    }
    else {
        if (messageRecived.includes("user")) {
            if (checkuser(username, password)) {
                answer = "logged successfully as " + username;
            }
            else {
                answer = "wrong credentials";
            }        
        }
        else {
            answer = messageRecived;
        }
    }
    console.log("update list", users);
    return answer;
}

function addUser(username, password) {
    var index = users.findIndex(p => p.username == username);
    if (index==-1 && username != "") {
        users.push({username, password});
        fs.writeFileSync("./users.json", JSON.stringify(users), 'utf8');
        return true;
    }
    return false;
}

function checkuser(username, password){
    var index = users.findIndex(p => p.username == username);
    if (index!=-1)
        if(password==users[index].password) return true
    return false;
}