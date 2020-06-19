const express = require("express");
const app = express();
const userRoutes = express.Router();

let User = require("../models/User");

// Register users
userRoutes.route("/register").post(function (req, res) {
    let user = new User(req.body);
    user.setPassword(req.body.password);
    user.save()
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

userRoutes.route("/login").post(function (req, res) {
    let loginUser = {
        email: req.body.email
    };
    User.findOne(loginUser, function(err, user) {
        if (user && user.validPassword(req.body.password)) {
            user.token = user.generateJwt();
            res.json(user);
        } else {
            res.status(404).send("Email or password is incorrect.");
        }
    });
});

module.exports = userRoutes;