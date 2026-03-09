if(process.env.NODE_ENV !== "production")
{
    require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./Models/user.js");
const MongoStore = require("connect-mongo").default;
//Router Routes
const listingRoutes = require("./Routes/listing.js");
const reviewRoutes = require("./Routes/reviews.js");
const userRoutes = require("./Routes/user.js");


const app = express();
// const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.ATLAS_DB_URL;



// DB connection
mongoose.connect(dbUrl)
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log(err));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));



//Map Token
app.use((req,res,next)=>{
    res.locals.mapToken = process.env.MAP_TOKEN;
    next();
});

//Mongo Session
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600
});

store.on("error",()=>{
    console.log("ERROR in MONGO SESSION STORE",err);
})

//Express Session
const sessionOptions = {
    store,
    secret : process.env.SECRET,
    resave : true,
    saveUninitialized: false, 
    cookie : {
        expires:  new Date(Date.now() + 7*24*60*60*1000),
        maxAge :7*24*60*60*1000,
        httpOnly : true
    }
}


app.use(session(sessionOptions)); 
app.use(flash());

//Passport Setup

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Flash Messaage
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// ROUTES
app.use("/listings", listingRoutes);
app.use("/listings/:id/reviews", reviewRoutes);
app.use("/",userRoutes);

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
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});