const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

//Sign Up Routes
router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
})

router.post("/signup",wrapAsync(async(req,res)=>{
    try
    {
        let {username,email,password} = req.body;
        const newUser = new User ({email,username});
        const regUser = await User.register(newUser,password);
        req.login(regUser,(err)=>{
            if(err)
               return next(err);
            req.flash("success","Sign Up successfully");
            res.redirect("/listings");
        });
    }catch(e)
    {
        req.flash("error",e.message);
        res.redirect("/signup");
    }
    
}));

//Login Routes
router.get("/login",(req,res)=>{
    res.render("users/logins.ejs");
})

router.post("/login",saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }), 
    (req, res) => {
        req.flash("success", `Welcome back, ${req.user.username}!`);
        let redirectUrl = res.locals.redirectUrl||"/listings";
        res.redirect(redirectUrl); 
    
    }
);

// Logout Route
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged Out Successfully!");
        res.redirect("/listings"); 
    });
});




module.exports = router;