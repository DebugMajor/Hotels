const Listing = require("../Models/listings");

module.exports.index = async (req, res) => {
    const allListing = await Listing.find();
    res.render("listings/index", { allListing });
};


module.exports.renderNewForm = (req, res) => {
    res.render("listings/new");
};

module.exports.showListings = (async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if (!listing){
        req.flash("error","Listing you requested for does not exsist");
        return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show", { listing });
});

module.exports.newListing =(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner =req.user;
    await newListing.save();
    req.flash("success","New listing created!!");
    res.redirect("/listings");
});

module.exports.editForm = (async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing){
        req.flash("error","Listing you requested for does not exsist");
        return res.redirect("/listings");
    }
    res.render("listings/edit", { listing });
});

module.exports.updateListing = (async (req, res) => {
    let { id } = req.params;     
    await Listing.findByIdAndUpdate(id, req.body.listing, { new: true, runValidators: true });
    req.flash("success","Listing Updated!!");
    res.redirect(`/listings/${id}`);
});

module.exports.destroyListing = (async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted!!");
    res.redirect("/listings");
});