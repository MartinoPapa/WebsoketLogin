const ws = new WebSocket('ws://localhost:8080/');
ws.onopen = function() {
    console.log('Connected to '+ ws.url);
};
ws.onmessage = function(e) {
  console.log(`${e.currentTarget.url}: "${e.data}"`);
};

function Login(name, password){
    ws.send("user:"+name+":"+password);
}   

function Register(name, password){
  ws.send("new:"+name+":"+password);
}   