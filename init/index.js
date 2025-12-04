const mongoose = require("mongoose");
const data = require("./data.js");
const Listing = require("../Models/listings.js");

const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("Connected to DB");
    initDB();
}).catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect(mongo_url);
}

const initDB = async()=>{
    try{
        await Listing.deleteMany({});
        const listingsWithOwner = data.data.map((obj) => ({...obj,owner: "68e0dd114c8bf7f15bf00a06"}));
        await Listing.insertMany(listingsWithOwner);
        console.log("Data was Entered.");
}catch(err){
    console.log("Error inserting data:",err);
    }
};