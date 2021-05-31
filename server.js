const express = require('express');
const app = express();
//websocket 사용하기 위한 패키지
//npm install socket.io
const socket = require('socket.io');
//http == express
const http = require('http') //socket과 연결하기 위해서 http 문서를 읽기 위해서
const server = http.createServer(app);
const io = socket(server);
const nunjucks = require('nunjucks');

app.use(express.static('./node_modules/socket.io/client-dist'));
app.set('view engine','html');
nunjucks.configure('views',{
    express:app,
})

app.get('/',(req,res)=>{
    res.render('index');
});

//addEventListener('',)
io.sockets.on('connection',(socket)=>{
    socket.on('send',(data)=>{
        console.log(`클라이언트에서 받은 메세지는 데이터 ${data.msg}`);
        socket.broadcast.emit('call',data.msg)
    })
})

server.listen(3000,()=>{
    console.log('server start port 3000');
});