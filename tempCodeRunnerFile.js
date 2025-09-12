const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const Listing = require("../Models/listings.js");


let port = 3000;

const app = express();
const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";

main.then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect("mongo_url");
    
}


app.get("/",(req,res)=>{
    res.send("Hello")
})


app.get("/testlisting",async (req,res)=>{
    let sampleListing = new Listing({
        title:"my new listing",
        description : "By the beach",
        price:1200,
        location:"Goa",
        Country:"India"
    })

    await sampleListing.save();
    console.log("Sample was saved");
    res.send("Successful Testings");
})















app.listen(port,()=>{
    console.log(`App started at ${port}.`);
})