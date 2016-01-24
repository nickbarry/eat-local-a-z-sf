var User = require("../models/user");

module.exports = {
    recordHistory: function(req, res) {
        var self = this;
        var userId = req.params.user_id;

        User.findOne({
            fbUserId: userId
        }).exec(function(err, user) {
            if (err) return res.status(500).json({
                error: err
            });
            if (!user) {
                var userObj = self.createUser(userId);
                var newUser = new User(userObj);
                newUser.save(function(err, user) {
                    if (err) return res.status(500).json({
                        error: err
                    });
                    return res.status(200);
                });
            }
            else {
                self.recordInfo(user, req.body)
                    .then(function(user) {
                        return res.json(user);
                    })
                    .catch(function(err) {
                        res.json({
                            error: err
                        });
                    });
            }
        });

    },
    createUser: function(userId) {
        var user = {
            fbUserId: userId,
            username: '',
            lettersDone: [],
            cuisinesDone: [],
            restaurantsDone: []
        };
        return user;
    },
    showHistory: function(req, res) {
        var self = this;
        var userId = req.params.user_id;

        User.findOne({
            fbUserId: userId
        }).exec(function(err, user) {
            var allLetters = 'abcdefghijklmnopqrstuvwxyz'.split('');
            if (err) return res.status(500).json({
                error: err
            });
            if (!user) {
                var userObj = self.createUser(userId);
                var newUser = new User(userObj);
                newUser.save(function(err, user) {
                    if (err) return res.status(500).json({
                        error: err
                    });
                    res.json({
                        letters: allLetters
                    });
                });
            }
            else {
                var newLetters = self.findNewLetters(user, allLetters);
                res.json(newLetters);
            }
        });
    },
    findNewLetters: function(user, allLetters) {
        var lettersDone = user.lettersDone;
        var newLetters = allLetters.filter(function(letter) {
            return lettersDone.indexOf(letter) === -1;
        });
        return newLetters;
    },
    recordInfo: function(user, body) {
        return new Promise(function(resolve, reject) {
            if (user.cuisinesDone.indexOf(body.cuisine) === -1) {
                user.cuisinesDone.push(body.cuisine);
            }
            if (user.restaurantsDone.indexOf(body.restaurant) === -1) {
                user.restaurantsDone.push(body.restaurant);
            }
            if (user.lettersDone.indexOf(body.letter) === -1) {
                user.lettersDone.push(body.letter);
            }
            user.save(function(err, user) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(user);
                }
            });
        });
    }
};