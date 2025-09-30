const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
})

router.post("/signup",wrapAsync(async(req,res)=>{
    try
    {
        let {username,email,password} = req.body;
        const newUser = new User ({email,username});
        const regUser = await User.register(newUser,password);
        req.flash("success","Sign Up successfully");
        res.redirect("/listings");
    }catch(e)
    {
        req.flash("error",e.message);
        res.redirect("/signup");
    }
    
}));

router.get("/login",(req,res)=>{
    res.render("users/logins.ejs");
})

router.post("/login",
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }),
    (req, res) => {
        req.flash("success", `Welcome back, ${req.user.username}!`);
        req.session.save(() => { 
            res.redirect("/listings"); 
        });
    }
);



module.exports = router;