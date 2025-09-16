const Joi = require('joi');

module.exports.listingSchema = Joi.object({ 
    //Listing is compulsorily required : 
    listing : Joi.object({
        
        price : Joi.number().required(),
        description : Joi.string().required(),
        location : Joi.string().required(),
        country : Joi.string().required().min(0),
        image : Joi.string().allow("",null)

    }).required()
    

});