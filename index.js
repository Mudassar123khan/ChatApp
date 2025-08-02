const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path=require('path');
const Chat = require('./models/chat.js');
const methodOverRide = require('method-override');

app.set("views",path.join(__dirname,"views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverRide("_method"));

//Connecting our app to mongodb using mongoose
main().then(()=>{
    console.log("mongodb connected");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp'); 
}

//Normal home route;
app.get("/",(req,res)=>{
    console.log("GET request received");
    res.send("App is working");
});

//Route to get all the chats
app.get("/chats",async (req,res)=>{
    await Chat.find().then((data)=>{
        console.log("GET request for all chats is received");
        res.render("index.ejs",{data});
    }).catch((err)=>{
        console.log(err);
        res.send("GET request for chats is not received");
    });  
});

//Route to render form for creating new chat
app.get("/chats/new",(req,res)=>{
    console.log("GET request for creating new chat is received");
    res.render("newChat.ejs");
});

//Route to save new chat to database
app.post("/chats",async (req,res)=>{
    console.log("all good")
    let {name,msg,receiver}=req.body;
    await Chat.insertOne({
        from:name,
        msg:msg,
        to:receiver,
        created_at:new Date()
    });
    res.redirect("/chats");
});

//Route to edit msg
app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params;
    console.log("Edit request received");
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
});

//Route to save the edited message
app.put("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let {newmsg}=req.body;
    await Chat.findByIdAndUpdate(id,{msg:newmsg});
    res.redirect("/chats");
});

//Route to delete a chat
app.delete("/chats/:id/delete",async (req,res)=>{
    let {id}= req.params;
    console.log(id);
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
});

//Setting up the server;
app.listen(8080,()=>{
    console.log("Server is listening");
});