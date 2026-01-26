const express =require('express');
const cors=require('cors');
const dotenv=require('dotenv');
const http=require('http');
const {Server}=require('socket.io');
const {addMessage}=require('./controllers/messageControllers');


const fs=require('fs');

// const { version } = require('react');
const { getMessages, createMessages } = require('./controllers/messageControllers');

//dotenv in our server.js
dotenv.config();

const app=express();
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"],
    }
});
const PORT = 5000;

/**
 * What is the purpose of the app.use() method in Express.js?
 * A. Handling errors in middleware
 * B. Adding middleware to the application
 * C. Configuring routes
 * D. Handling HTTP requests
 * Explanation: The app.use() method in Express.js is used for adding middleware to the application, 
 *              allowing you to execute code during the request-response cycle.
 */

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

//Routes in server file
app.use('/api/messages',require('./routes/messageRoutes'));

//root route 
app.get('/',(req,res)=>{
    // res.send('Hello world');
    res.send({
        message:" Chat API Server",
        version:'1.0.0',
        endpoints:{
            getMessages:'GET /api/messages/hi',
            createMessages:'POST /api/messages',
            deleteMessages:'DELETE /api/messages',
            testClient:'GET /index.html',
        }
    });
})

//socket connection in backend
io.on('connection',(socket)=>{
    console.log(" User socket id is :",socket.id);

    //connect functionality by server
    socket.emit('message',{
        user:"System",
        text:"Welcome to the chat",
        timestamp:new Date().toISOString(),
    });
    //broadcast message to other users 
    socket.broadcast.emit('message',{
        user:'System',
        text:'A new user joined the chat',
        timestamp:new Date().toISOString(),
    });
    //disconnect functionality by server
    socket.on('disconnect',()=>{
        console.log("User disconnected ",socket.id);
        io.emit('message',{
            user:'System',
            text:'A User left the chat',
            timestamp:new Date().toISOString()
        })
    });


    //typing functionality in backend
    socket.on('typing',(data)=>{
        socket.broadcast.emit('userTyping',data);
    });
    //send and recive messages
    socket.on("sendMessage",(data)=>{
        const newMessage=addMessage(data);

        io.emit('receiveMessage',newMessage);
    });
});


//Error handling 
app.use((req,res)=>{
    res.status(404).json({
        success:false,
        message:'Route not found',
    })
})

app.use((err,req,res,next)=>{
    console.log(err.stack);
    res.status(500).json({
        success:false,
        message:'Something went wrong',
        error:err.message,
    })
})



//listen
server.listen(PORT,()=>{
    console.log(`Server is running at port number: ${PORT}`)
})




/**
 * --------------practice code snippets -----------------
//Test error route
app.get('/throwerror', async (req, res) => {
    throw new Error("This is a test error");
});
//

//Read file 
app.get('/read-file', (req, res, next) => {
  fs.readFile("C:\\Users\\potnu\\Solid_principles.txt", (err, data) => {
    if (err) {
      next(err) // Pass errors to Express.
    } else {
      res.setHeader('Content-Type', 'text/plain');
      res.send(data)
    }
  })
})




// //Test route 
// app.get('/test',(req,res)=>{
//     res.json({
//         message: 'Server is working perfectly',
//         timestamp: new Date(),
//         status: 'success'
//     })
// })

 */