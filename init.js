const mongoose = require('mongoose');
const Chat = require('./models/chat.js');
//connecting our server to the mongoDB database using mongoose
main().then(()=>{
    console.log("mongoDB connnected")
}).catch((err)=>{
    console.log(err);
});

async function main(){
   await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp')
}


let allChats=[
    {
        from:"Rohit",
        to:"Naina",
        msg:"I like you",
        created_at:new Date()
    },
     {
        from:"Aman",
        to:"Ayan",
        msg:"A ja football khelte hain",
        created_at:new Date()
    },
     {
        from:"Rehan",
        to:"Mudassir",
        msg:"Nice pass bro",
        created_at:new Date()
    },
     {
        from:"Hammad",
        to:"Mudassir",
        msg:"Wanna play match, 2nd yr vs 3rd yr",
        created_at:new Date()
    },
     {
        from:"Faizan",
        to:"Jannishar",
        msg:"Oh yeah",
        created_at:new Date()
    }
];

Chat.insertMany(allChats);