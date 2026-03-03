const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");
const { number } = require("joi");

const listingSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true }, 
    image: {
        url: String,
        filename : String,
    },
    location: String,
    country: String,
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review"
        }
    ],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    geometry:{
        type:{
            type : String,
            enum : ["Point"],
            required : true,
        },
        coordinates : {
            type : [Number],
            required : true
        },
    }
});

//Adding Mongoose Middleware to remove all reviews once parent listing is deleted.
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing)
    {
        await Review.deleteMany({reviews:{$in:listing.reviews}});
    }
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
