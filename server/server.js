const http = require('http');
const port = 8080;
const WebSocketServer = require('websocket').server;
const server = http.createServer();

var users = [];

server.listen(port);
console.log("server is listening on port "+ port)
const wsServer = new WebSocketServer({
    httpServer: server
});
wsServer.on('request', function(request) {
    const connection = request.accept(null, request.origin);
    connection.on('message', function(message) {
      connection.sendUTF(messageManager(message.utf8Data));
    });
    connection.on('close', function(reasonCode, description) {
        console.log('Client has disconnected.');
    });
});

function messageManager(messageRecived){
    var answer;
    if(messageRecived.includes("newuser")){
        var username = messageRecived.split(":")[1];
        if(addUser(username)){           
            answer = "logged successfully as "+username;
        }
        else{
            answer = username + " is alredy taken";
        }
        console.log(users);
    }       
    else
        answer = messageRecived;
        
    return answer;
}

function addUser(userName){
    if(!users.includes(userName)){
        users.push(userName);
        return true;
    }
    return false; 
}