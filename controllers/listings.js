const Listing = require("../Models/listings");
const mbxGeoCoding = require('@mapbox/mapbox-sdk/services/geocoding');

const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeoCoding({ accessToken: mapToken });


// =======================
// INDEX
// =======================
module.exports.index = async (req, res) => {

    const search = req.query.search ? req.query.search.trim() : "";

    let allListing;

    if (search) {
        allListing = await Listing.find({
            $or: [
                { title: { $regex: search, $options: "i" } },
                { location: { $regex: search, $options: "i" } },
                { country: { $regex: search, $options: "i" } }
            ]
        });
    } else {
        allListing = await Listing.find({});
    }

    res.render("listings/index", {
        allListing,
        search
    });
};

// =======================
// NEW FORM
// =======================
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new");
};


// =======================
// SHOW
// =======================
module.exports.showListings = async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing you requested does not exist");
        return res.redirect("/listings");
    }

    res.render("listings/show", { listing });
};


// =======================
// CREATE
// =======================
// =======================
// CREATE
// =======================
module.exports.newListing = async (req, res) => {

    // 1️⃣ Geocode location
    let geoResponse = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    }).send();

    // 2️⃣ Create new listing
    const newListing = new Listing(req.body.listing);

    // 3️⃣ Save geometry from Mapbox
    if (geoResponse.body.features.length > 0) {
        newListing.geometry = geoResponse.body.features[0].geometry;
    }
    else {
        // fallback if location not found
        newListing.geometry = {
            type: "Point",
            coordinates: [0, 0]
        };
    }

    // 4️⃣ Save image if uploaded
    if (req.file) {
        newListing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    // 5️⃣ Assign owner
    newListing.owner = req.user._id;

    // 6️⃣ Save to DB
    let savedListing = await newListing.save();

    console.log(savedListing);

    req.flash("success", "New listing created!");
    res.redirect("/listings");
};


// =======================
// EDIT FORM
// =======================
module.exports.editForm = async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing you requested does not exist");
        return res.redirect("/listings");
    }

    // Resize cloudinary image for preview
    let OGurl = listing.image.url;
    OGurl = OGurl.replace("/upload", "/upload/h_350,w_250");

    res.render("listings/edit", { listing, OGurl });
};


// =======================
// UPDATE
// =======================
module.exports.updateListing = async (req, res) => {

    let { id } = req.params;

    let listing = await Listing.findByIdAndUpdate(
        id,
        req.body.listing,
        { new: true, runValidators: true }
    );

    // If new image uploaded
    if (req.file) {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
        await listing.save();
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};


// =======================
// DELETE
// =======================
module.exports.destroyListing = async (req, res) => {
    const { id } = req.params;

    await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};