//Contains all review related routes

const express = require("express");
const router = express.Router({ mergeParams: true }); // mergeParams needed for nested routes
const Listing = require("../Models/listings");
const Review = require("../Models/review");
const { reviewSchema } = require("../schema");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, isAuthor,validateReview } = require("../middleware");

const reviewController = require("../controllers/reviews");

// POST Review

router.post(
  "/",
  isLoggedIn("Login to add a review"), 
  validateReview,
  wrapAsync(reviewController.createReview));


// DELETE Review
router.delete("/:reviewId",isLoggedIn("Login to delete a review"),isAuthor, wrapAsync(reviewController.delRev));

module.exports = router;
