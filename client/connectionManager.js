const ws = new WebSocket('ws://localhost:8080/');
ws.onopen = function() {
    console.log('Connected to '+ ws.url);
};
ws.onmessage = function(e) {
  document.getElementById("messages").innerHTML += `<p>${e.currentTarget.url}: "${e.data}"</p>`
};

function Login(name, password){
    ws.send("user:"+name+":"+password);
}   

function Register(name, password){
  ws.send("new:"+name+":"+password);
}   