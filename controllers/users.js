module.exports.renderSignUP = (req,res)=>{
    res.render("users/signup.ejs");
}
module.exports.signUP  = async(req,res)=>{
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
    
}

module.exports.renderLogin = (req,res)=>{
    res.render("users/logins.ejs");
}

module.exports.userLogin = (req, res) => {
        req.flash("success", `Welcome back, ${req.user.username}!`);
        let redirectUrl = res.locals.redirectUrl||"/listings";
        res.redirect(redirectUrl); 
    
    }

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged Out Successfully!");
        res.redirect("/listings"); 
    });
}