const mongoose = require('mongoose');

//Creating the schema
const chatSchema= new mongoose.Schema({
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    msg:{
        type:String,
        maxLength:50
    },
    created_at:{
        type:Date,
        required:true
    }
});

//Creating the model 
const Chat= mongoose.model("Chat",chatSchema);

//exporting the model
module.exports=Chat;