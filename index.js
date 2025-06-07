const express=require("express");
const app=express();
const mongoose = require('mongoose');
const path=require("path");
const methoOverride=require("method-override");
let Chat=require("./model/chat.js");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methoOverride("_method"));
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    console.log("working");
    res.send("hello");
});

app.listen(8080,()=>{
    console.log("sever working....");
});

app.get("/chats",async (req,res)=>{
    let chats= await Chat.find();
    res.render("index.ejs",{chats});
});

//NEW ROUTE.....
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});

//CREATE ROUTE....
app.post("/chats",(req,res)=>{
    let { from, to, msg }=req.body;
    let newChat=new Chat({
        from:from,
        to:to,
        msg:msg,
        create_at:new Date(),
    })
    newChat.save()
    .then(res=>{
        console.log("");
    })
    .catch(err =>{
        console.log(err);
    });
    res.redirect("/chats");
});

//EDIT ROUTE.....
app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
});

//UPDATE ROUTE.....
app.put("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let {msg : newMsg}=req.body;
    let updatedChat=await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true},{new:true});
    res.redirect("/chats");
}); 


//DELETE ROUTE.....
app.delete("/chats/:id",async (req,res)=>{
      let {id}=req.params;
      let deletedChat=await Chat.findByIdAndDelete(id);
      res.redirect("/chats");
});


main()
.then(res=>{
    console.log("success");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chat');
}