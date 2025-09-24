const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");

const listingRoutes = require("./Routes/listing.js");
const reviewRoutes = require("./Routes/reviews.js");

const app = express();
const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";

// DB connection
mongoose.connect(mongo_url)
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log(err));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
app.use("/listings", listingRoutes);
app.use("/listings/:id/reviews", reviewRoutes);

// Home Page
app.get("/", (req, res) => {
    res.send("Hello");
});

// 404 handler
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something Went Wrong!" } = err;
    res.status(statusCode).render("listings/error", { err });
});

// Start Server
app.listen(3000, () => {
    console.log("App running on port 3000");
});
