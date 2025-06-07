const mongoose = require('mongoose');

let chatSchema=new mongoose.Schema({
    from:{
        type:String,
        required:true,
    },
      msg:{
        type:String,
    },
      to:{
        type:String,
        required:true,
    },
      create_at:{
        type:Date,
        required:true,
    },
});

let Chat=mongoose.model("Chat",chatSchema);

module.exports=Chat;