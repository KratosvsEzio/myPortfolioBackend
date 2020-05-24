const express = require('express');
// const checkAuth = require('../middleware/check-auth');
const routes = express.Router();

/* Require User models here */
let User = require('../Models/user.model');

// Update Portfolio Route
routes.put("", (req, res, next) => {
    console.log(req.body);
    User.find()
    .then( (user) => {
        user[0].profile = {
            name: req.body.name,
            image: req.body.image,
            address: req.body.address,
            email: req.body.email,
            specialization: req.body.specialization,
            recentDegree: req.body.recentDegree,
            githubURL: req.body.githubURL,
            cvURL: req.body.cvURL,
        }
        user[0].save()
        .then( () => {
            res.status(200).json({
                message: "Profile updated successfully!",
                status: true
            });
        })
        .catch( err => {
            console.log(err.message);
        });
    })
    .catch( err => {
        console.log(err.message);
    });
});

module.exports = routes;