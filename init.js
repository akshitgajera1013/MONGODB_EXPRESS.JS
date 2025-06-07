const mongoose = require('mongoose');
let Chat=require("./model/chat.js");

main()
.then(res=>{
    console.log("success");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chat');
}

let chat=[
    {
        from:"akshit",
        to:"jigar",
        msg:"hello",
        create_at:new Date(),
    },
     {
        from:"om",
        to:"suresh",
        msg:"nice day!!",
        create_at:new Date(),
    },
     {
        from:"rahul",
        to:"mukesh",
        msg:"today i am working..",
        create_at:new Date(),
    },
     {
        from:"suraj",
        to:"gaurav",
        msg:"hello, happy bday!!!!",
        create_at:new Date(),
    },
]

Chat.insertMany(chat);