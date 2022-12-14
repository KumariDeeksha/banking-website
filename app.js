const express = require("express");
const bodyp = require("body-parser");
const mongoose = require("mongoose");
const Customers = require("./models/dbCustomers.js");
const Transfer = require("./models/transferdb.js");
const {render} = require("ejs");
const app = express();
const  port = process.env.PORT || 5000

app.use(bodyp.urlencoded({ extended: false }));
app.use(bodyp.json());

// MONGODB SETUP
const DBurl = "mongodb://localhost:27017/sparks-foundation";
app.set("view engine", "ejs");
app.use(express.static("public"));
mongoose.connect(DBurl,{ useNewUrlParser: true , useUnifiedTopology: true } )
    .then((result)=>console.log("Connected to DataBase"))
    .catch((err)=>console.log(err));

// HOME ROUTE
app.get("/",(req,res)=>{ 
    res.render("index");

})

// MYCUSTOMER ROUTE
app.get("/mycustomers",(req,res)=>{
    Customers.find()
        .then((result)=>{
            const results = result;
            res.render("mycustomers",{results});
        })
        .catch((err)=>{
            res.send(err);
        })
})

// TRANSFER MONEY ROUTE
app.get("/transfermoney",(req,res)=>{
    res.render("transfer_money")
})

// ABOUT ROUTE
app.get("/about",(req,res)=>{
    res.render("about")
})

// ALL TRANSFER MONEY
app.get("/alltransfermoney",(req,res)=>{
    Transfer.find()
        .then((result)=>{
            const results1 = result;
            res.render("recordalltransfers ",{results1});
        })
        .catch((err)=>{
            console.lod(err)
        })
})

// POST REQUEST
app.post("/p",(req,res)=>{ 
    const transfer = new Transfer({
                acnumber:req.body.acnumber,
                money:req.body.money,
            });
            transfer.save()
                .then((result)=>{
                    res.redirect('/alltransfermoney')
                })
                .catch((err)=>{
                    res.send(err)
                }) 
})

// SERVER LISTEN
app.listen(port,()=>{
    console.log("Server Started");
})


 
 

