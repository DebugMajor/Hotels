//Contains all listings related path

const express = require("express");
const router = express.Router();
const Listing = require("../Models/listings");
const Review = require("../Models/review");

const wrapAsync = require("../utils/wrapAsync");
const {isLoggedIn,isOwner,validateListing} = require("../middleware");

const listingController = require("../controllers/listings");


router.route("/")
    .get(wrapAsync(listingController.index))
    .post(validateListing,isLoggedIn("Logint to CREATE a new LISTING"),listingController.newListing);

// NEW Route
router.get("/new", isLoggedIn("Logint to add a NEW listing"),listingController.renderNewForm);



router.route("/:id")
    //Show Route
    .get(listingController.showListings)
    //Update Route
    .put(isLoggedIn("Login to UPDATE the listing!"),isOwner, validateListing,listingController.updateListing)
    //Delete Route
    .delete(isLoggedIn("Login to DELETE the listing"),listingController.destroyListing)



// EDIT Route
router.get("/:id/edit", isLoggedIn("Login to EDIT the listing"),isOwner,listingController.editForm);

module.exports = router;
