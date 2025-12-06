//Contains all listings related path

const express = require("express");
const router = express.Router();
const Listing = require("../Models/listings");
const Review = require("../Models/review");

const wrapAsync = require("../utils/wrapAsync");
const {isLoggedIn,isOwner,validateListing} = require("../middleware");

const listingController = require("../controllers/listings");

// INDEX Route - all listings
router.get("/", wrapAsync(listingController.index));

// NEW Route
router.get("/new", isLoggedIn("Logint to add a NEW listing"),listingController.renderNewForm);

// CREATE Route
router.post("/", validateListing,isLoggedIn("Logint to CREATE a new LISTING"),isOwner,listingController.newListing);

// SHOW Route
router.get("/:id",listingController.showListings);

// EDIT Route
router.get("/:id/edit", isLoggedIn("Login to EDIT the listing"),isOwner,listingController.editForm);

// UPDATE Route
router.put("/:id",isLoggedIn("Login to UPDATE the listing!"),isOwner, validateListing,listingController.updateListing);

// DELETE Route
router.delete("/:id", isLoggedIn("Login to DELETE the listing"),listingController.destroyListing);

module.exports = router;
