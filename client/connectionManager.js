var _username;
var _password;

const msgTypes = {
  Register: 0,
  Login: 1
}

const msgAnswers = {
  Error: 0,
  Confirmed: 1
}

const ws = new WebSocket('ws://localhost:8080/');
ws.onopen = function() {  
    console.log('Connected to '+ ws.url);
};
ws.onmessage = function(e) {
  console.log(JSON.parse(e.data));
};

function Login(name, password){
    _username = name;
    _password = password;
    SendMessage(msgTypes.Login, "");
}   

function Register(name, password){
  _username = name;
  _password = password;
  SendMessage(msgTypes.Register, "");
}   

function SendMessage(type, text){
  var msg = {
    "type": type,
    "username": _username,
    "password": _password,
    "text": text
  }
  ws.send(JSON.stringify(msg));
}