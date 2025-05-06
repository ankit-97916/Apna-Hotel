const joi = require("joi");

module.exports.listingSchema =  joi.object({
    listing : joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        location: joi.string().required(),
        country: joi.string().required(),
        price: joi.number().required().min(0),
        image : joi.string().allow("", null),

    }).required(),
});

// schema validtaion for review-
module.exports.reviewSchema =  joi.object({
    review : joi.object({
        ratings: joi.number().required().min(1).max(5),
        comment: joi.string().required()
    }).required()
});

