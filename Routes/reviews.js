//Contains all review related routes

const express = require("express");
const router = express.Router({ mergeParams: true }); // mergeParams needed for nested routes
const Listing = require("../Models/listings");
const Review = require("../Models/review");
const { reviewSchema } = require("../schema");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, isAuthor } = require("../middleware");

// Validation middleware
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    next();
};

// POST Review

router.post(
  "/",
  isLoggedIn("Login to add a review"), 
  validateReview,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      req.flash("error", "Listing you requested for does not exist");
      return res.redirect("/listings");
    }

    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    await newReview.save();

    listing.reviews.push(newReview);
    await listing.save();

    req.flash("success", "New Review Created!!");
    res.redirect(`/listings/${id}`);
  })
);


// DELETE Review
router.delete("/:reviewId",isLoggedIn("Login to delete a review"),isAuthor, wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!!");
    res.redirect(`/listings/${id}`);
}));

module.exports = router;
