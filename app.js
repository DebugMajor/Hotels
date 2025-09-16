const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const Listings = require("./Models/listings");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync");
const { wrap } = require("module");
const ExpressError = require("./utils/ExpressError");




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

//Index Route
app.get("/listings",async(req,res)=>{
   const allListing =  await Listings.find({});
   res.render("./listings/index.ejs",{allListing});
})


//New Route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
})

//Show Route
app.get("/listings/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let listing = await Listings.findById(id);
    res.render("./listings/show.ejs",{listing});
}));

//Create Route
app.post("/listings", wrapAsync(async (req, res, next) => {
    if(!req.body.listing)
    {
        throw new ExpressError(err);
    }
    const newlisting = new Listings(req.body.listing);
    await newlisting.save();
    res.redirect("/listings");
}));


//Edit Route
app.get("/listings/:id/edit",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    const listing = await Listings.findById(id);
    res.render("listings/edit.ejs",{listing});
}));

//Update Route
app.put("/listings/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    await Listings.findByIdAndUpdate(id,req.body.listing);
    res.redirect("/listings");
}));

//Delete Route
app.delete("/listings/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let deletedEntry = await Listings.findByIdAndDelete(id);
    console.log(deletedEntry);
    res.redirect("/listings");
}));

//For random req with no path
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});


//Error Handling Middleware
app.use((err,req,res,next) =>
{
    const{statusCode = 500, message = "Something Went Wrong!"} = err;
    // res.status(statusCode).send(message);
    res.send(statusCode).render("Listings/Error",{err});

})


//Start the app
app.listen(port,()=>{
    console.log(`App started at ${port}.`);
})