const express=require("express");
const app=express();
const mongoose = require('mongoose');
const path=require("path");
const methoOverride=require("method-override");
let Chat=require("./model/chat.js");
const ExpressError=require("./ExpressError");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methoOverride("_method"));
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    try{
    console.log("working");
    res.send("hello");
    }
    catch(err){
    next(err);
    }
});

app.listen(8080,()=>{
    console.log("sever working....");
});

app.get("/chats",async (req,res)=>{
    try{
    let chats= await Chat.find();
    res.render("index.ejs",{chats});
    } catch(err){
        next(err);
    }
});


app.get("/chats/:id",async (req,res)=>{
    try{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    if(!chat){
    next( new ExpressError(401,"PAGE NOT FOUND!!!"));
    } catch(err){
        next(err)
    }
});

//NEW ROUTE.....
app.get("/chats/new",(req,res)=>{
    try{
    res.render("new.ejs");
    } catch(err){
        next(err)
    }
});

//CREATE ROUTE....
app.post("/chats",(req,res)=>{
    try{
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
    }{ catch(err){
        next(err)
    }
});

//EDIT ROUTE.....
app.get("/chats/:id/edit",async (req,res)=>{
    try{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
    } catcch(err){
    next(err)
    }
});

//UPDATE ROUTE.....
app.put("/chats/:id",async (req,res)=>{
    try{
    let {id}=req.params;
    let {msg : newMsg}=req.body;
    let updatedChat=await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true},{new:true});
    res.redirect("/chats");
    } catch(err){
        next(err)
    }
}); 


//DELETE ROUTE.....
app.delete("/chats/:id",async (req,res)=>{
    try{
      let {id}=req.params;
      let deletedChat=await Chat.findByIdAndDelete(id);
      res.redirect("/chats");
    } catch(err){
        next(err)
    }
});

app.use((err,req,res,next)=>{
   let { status=500,message="Some Error"}=err;
    res.status(status).send(message);
    )};

main()
.then(res=>{
    console.log("success");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chat');
}
