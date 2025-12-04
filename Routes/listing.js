//Contains all listings related path

const express = require("express");
const router = express.Router();
const Listing = require("../Models/listings");
const Review = require("../Models/review");

const wrapAsync = require("../utils/wrapAsync");
const {isLoggedIn,isOwner,validateListing} = require("../middleware");




// INDEX Route - all listings
router.get("/", wrapAsync(async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listings/index", { allListing });
}));

// NEW Route
router.get("/new", isLoggedIn("Logint to add a NEW listing"),(req, res) => {
    res.render("listings/new");
});

// CREATE Route
router.post("/", validateListing,isLoggedIn("Logint to CREATE a new LISTING"),isOwner, wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner =req.user;
    await newListing.save();
    req.flash("success","New listing created!!");
    res.redirect("/listings");
}));

// SHOW Route
router.get("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if (!listing){
        req.flash("error","Listing you requested for does not exsist");
        return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show", { listing });
}));

// EDIT Route
router.get("/:id/edit", isLoggedIn("Login to EDIT the listing"),isOwner,wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing){
        req.flash("error","Listing you requested for does not exsist");
        return res.redirect("/listings");
    }
    res.render("listings/edit", { listing });
}));

// UPDATE Route
router.put("/:id",isLoggedIn("Login to UPDATE the listing!"),isOwner, validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;     
    await Listing.findByIdAndUpdate(id, req.body.listing, { new: true, runValidators: true });
    req.flash("success","Listing Updated!!");
    res.redirect(`/listings/${id}`);
}));

// DELETE Route
router.delete("/:id", isLoggedIn("Login to DELETE the listing"),wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted!!");
    res.redirect("/listings");
}));

module.exports = router;
