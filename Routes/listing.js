//Contains all listings related path

const express = require("express");
const router = express.Router();
const Listing = require("../Models/listings");
const Review = require("../Models/review");

const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");

const listingController = require("../controllers/listings");

const multer = require('multer');
const { storage } = require('../cloudConfig.js')
const upload = multer({ storage });


router.route("/")
    .get(wrapAsync(listingController.index))
    .post(upload.single('listing[image]'), validateListing, isLoggedIn("Logint to CREATE a new LISTING"), listingController.newListing);


// NEW Route
router.get("/new", isLoggedIn("Logint to add a NEW listing"), listingController.renderNewForm);



router.route("/:id")
    //Show Route
    .get(listingController.showListings)
    //Update Route
    .put(isLoggedIn("Login to UPDATE the listing!"), isOwner, upload.single('listing[image]'), validateListing, listingController.updateListing)
    //Delete Route
    .delete(isLoggedIn("Login to DELETE the listing"), listingController.destroyListing)



// EDIT Route
router.get("/:id/edit", isLoggedIn("Login to EDIT the listing"), isOwner, listingController.editForm);

//Filter Routes
router.get("/filter/:category", async (req, res) => {
    const { category } = req.params;
    const filteredListings = await Listing.find({ category: { $in: [category] } })

    res.render("listings/index", { allListing: filteredListings });
});

module.exports = router;
