const Listing = require("./Models/listings")
const Review = require("./Models/review")
const ExpressError = require("./utils/ExpressError");
const { listingSchema, reviewSchema } = require("./schema");
// middleware.js
module.exports.isLoggedIn = (message = "Login required!") => {
    return (req, res, next) => {
        if (!req.isAuthenticated()) {
            //redirecrURL : if user is not logged in
            req.session.redirectUrl = req.originalUrl;


            req.flash("error", message);
            return res.redirect("/login");
        }
        next();
    };
};

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl)
        res.locals.redirectUrl = req.session.redirectUrl;
    next();
}

module.exports.isOwner = async (req,res,next) =>{
        let { id } = req.params;
        let listing = await Listing.findById(id);
        console.log("isOwner listing: ",listing);
        if(!listing.owner._id.equals(req.user._id))
        {
            req.flash("error","You are not the owner");
            return res.redirect(`/listings/${id}`);
        }
            
        next();        

        }   
// Validation middleware
module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    next();
};    


//Validate Reviews
module.exports.validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error)
    {
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else
        next();
};

//Review Author
module.exports.isAuthor = async (req,res,next) =>{
        let { id,reviewId } = req.params;
        let review = await Review.findById(reviewId);
        if(!review.author.equals(res.locals.currUser._id))
        {
            req.flash("error","You are not the Author");
            return res.redirect(`/listings/${id}`);
        }
            
        next();      
}  
