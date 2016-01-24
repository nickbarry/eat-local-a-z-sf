var restaurants = require("../controllers/restaurants");
var users = require("../controllers/users");

module.exports = function(app, express) {
    var apiRouter = express.Router();
    apiRouter.route('/:foodType/:lat/:long')
        .get(function(req, res) {
            restaurants.getRestaurants(req, res);
        });

    apiRouter.route('/users/:user_id')
        .get(function(req,res){
             users.showHistory(req,res);
        })
        .post(function(req,res){
            users.recordHistory(req, res);
        });
    return apiRouter;
};