var Yelp = require('yelp');
var cuisinesFile = require("../cuisines.json");

var yelp = new Yelp({
    consumer_key: process.env.YELP_CONSUMER_KEY,
    consumer_secret: process.env.YELP_CONSUMER_SECRET,
    token: process.env.YELP_TOKEN,
    token_secret: process.env.YELP_TOKEN_SECRET
});

module.exports = {
    getRestaurants: function(req, res) {
        var self= this;
        var foodType = req.params.foodType;
        var yelpFoodType = cuisinesFile[foodType];
        var loc = {
          lat: req.params.lat,
          long: req.params.long
        };
       
        yelp.search({
                term: 'food',
                location: 'San Francisco',
                category_filter: yelpFoodType,
                sort: 2,
                cll: loc.lat + ',' + loc.long
            })
            .then(function(data) {
                // var newData = self.modifyResponse(data);
                res.json(data.businesses);
            })
            .catch(function(err) {
                console.error(err);
                res.status(500).json({
                    error: err
                });
            });
    }, 
    getIndividualRestaurant: function(req, res) {
        // var restaurantId = req.params.restaurant_id;

        // // See http://www.yelp.com/developers/documentation/v2/business
        // yelp.business(restaurantId)
        //     .then(function(data) {
        //         console.log(data);
        //         res.json(data);
        //     })
        //     .catch(function(err) {
        //         console.log(err);
        //         res.status(500).json({
        //             error: err
        //         })
        //     });
    },
    modifyResponse: function(data){
        var newData;
        var businessesArr = data.businesses;
        
        return newData;
    }
};