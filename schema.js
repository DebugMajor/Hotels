const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    //Listing is compulsorily required : 
    listing: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required().min(2),
        image: Joi.string().allow("", null),
        category: Joi.alternatives().try(
            Joi.array().items(
                Joi.string().valid(
                    'Trending',
                    'Rooms',
                    'Mountains',
                    'Forts',
                    'Pools',
                    'Farms',
                    'Camping',
                    'Snowfall',
                    'Beach',
                    'Domes',
                    'Boat',
                    'Zoo'
                )
            ),
            Joi.string().valid(
                'Trending',
                'Rooms',
                'Iconic Cities',
                'Mountains',
                'Forts',
                'Pools',
                'Farms',
                'Camping',
                'Snowfall',
                'Beach',
                'Domes',
                'Boat',
                'Zoo'
            )
        )
    }).required()


});


module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required()
    }).required()
});