const Listing = require("../Models/listings");
const Review = require("../Models/review");
const { listingSchema } = require("../schema");

module.exports.createReview = (async (req, res) => {
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
  });


  module.exports.delRev =(async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!!");
    res.redirect(`/listings/${id}`);
});