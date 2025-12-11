const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userContoller = require("../controllers/users")

//Sign Up Routes
router.route("/signup")
    .get((userContoller.renderSignUP))
    .post(wrapAsync(userContoller.signUP));

//Login Routes
router.route("/login")
    .get(userContoller.renderLogin)
    .post(saveRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: "/login",
            failureFlash: true
        }), 
        userContoller.userLogin
        );

// Logout Route
router.get("/logout", userContoller.logout);




module.exports = router;