const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

const sessionOptions = {
    secret: "myscretString",
    resave: false,
    saveUninitialized: true
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(session(sessionOptions));
app.use(flash());

// Middleware to make flash messages available in all templates
app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
});

app.get("/register", (req, res) => {
    let { name = "anonymous" } = req.query;
    req.session.name = name;
    console.log(req.session.id);

    if (name === "anonymous") {
        req.flash("error", "User not registered");
    } else {
        req.flash("success", "User registered");
    }

    res.redirect("/hello");
});

app.get("/hello", (req, res) => {
    console.log(req.session);
    res.render("page.ejs", { name: req.session.name });
});

app.get("/", (req, res) => {
    res.send("Hello");
});

app.listen(3000, () => {
    console.log("App started at 3000");
});
