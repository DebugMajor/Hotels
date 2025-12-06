const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userContoller = require("../controllers/users")
//Sign Up Routes
router.get("/signup",(userContoller.renderSignUP))

//POST Route
router.post("/signup",wrapAsync(userContoller.signUP));

//Login Routes
router.get("/login",userContoller.renderLogin)

//Login 
router.post("/login",saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }), 
    userContoller.userLogin
);

// Logout Route
router.get("/logout", userContoller.logout);




module.exports = router;