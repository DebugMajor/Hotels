const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/users");

// Sign Up Routes
router.route("/signup")
    .get(userController.renderSignUP)
    .post(wrapAsync(userController.signUP));

// Login Routes
router.route("/login")
    .get(userController.renderLogin)
    .post(
        saveRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: "/login",
            failureFlash: true
        }),
        userController.userLogin
    );

// Logout Route
router.get("/logout", userController.logout);

module.exports = router;