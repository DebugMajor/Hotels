const User = require("../Models/user");

// Render Signup Page
module.exports.renderSignUP = (req, res) => {
    res.render("users/signup.ejs");
};

// Signup Logic
module.exports.signUP = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const newUser = new User({
            username,
            email
        });

        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }

            req.flash("success", "Welcome to WanderLust!");
            res.redirect("/listings");
        });

    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

// Render Login Page
module.exports.renderLogin = (req, res) => {
    res.render("users/login.ejs");
};

// Login Logic
module.exports.userLogin = (req, res) => {
    req.flash("success", `Welcome back, ${req.user.username}!`);
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

// Logout
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        req.flash("success", "Logged Out Successfully!");
        res.redirect("/listings");
    });
};