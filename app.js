const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const Listings = require("./Models/listings");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync");
const { wrap } = require("module");


let port = 3000;

const app = express();
const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"public")));




main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect(mongo_url);
}

//Home Page
app.get("/",(req,res)=>{
    res.send("Hello")
})

//
app.get("/listings",async(req,res)=>{
   const allListing =  await Listings.find({});
   res.render("./listings/index.ejs",{allListing});
})



app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
})


app.get("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    let listing = await Listings.findById(id);
    res.render("./listings/show.ejs",{listing});
})

//Create Route
app.post("/listings", wrapAsync(async (req, res, next) => {
    const newlisting = new Listings(req.body.listing);
    await newlisting.save();
    res.redirect("/listings");
}));


//Edit Route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id} = req.params;
    const listing = await Listings.findById(id);
    res.render("listings/edit.ejs",{listing});
})

app.put("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    await Listings.findByIdAndUpdate(id,req.body.listing);
    res.redirect("/listings");
})


app.delete("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    let deletedEntry = await Listings.findByIdAndDelete(id);
    console.log(deletedEntry);
    res.redirect("/listings");
})


app.use((err,req,res,next) =>
{
    res.send("Something went wrong");
})



app.listen(port,()=>{
    console.log(`App started at ${port}.`);
})