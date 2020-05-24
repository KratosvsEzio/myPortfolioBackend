const express = require('express');
// const checkAuth = require('../middleware/check-auth');
const mongoose = require('mongoose');
const routes = express.Router();

/* Require User models here */
let User = require('../Models/user.model');

// Create Portfolio Route
routes.post("", (req, res, next) => {
    User.find()
    .then( (user) => {
        user[0].portfolio.push({ 
            _id: mongoose.Types.ObjectId(),
            img: req.body.img,
            name: req.body.name,
            category: req.body.category,
            demoURL: req.body.demoURL,
            gitURL: req.body.gitURL
        })
        user[0].save()
        .then( () => {
            res.status(200).json({
                message: "Portfolio created successfully!",
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

// Update Portfolio Route
routes.put("/:id", (req, res, next) => {
    User.updateOne({'portfolio._id': mongoose.Types.ObjectId(req.params.id)}, {
        "portfolio.$.img": req.body.img,
        "portfolio.$.name": req.body.name,
        "portfolio.$.category": req.body.category,
        "portfolio.$.demoURL": req.body.demoURL,
        "portfolio.$.gitURL": req.body.gitURL,
    } )
    .then( (results) => {
        res.status(200).json({
            message: "Portfolio updated successfully!",
            status: true
        });
    })
    .catch( err => {
        console.log(err.message);
    });
});

// Delete Portfolio Route
routes.delete("/:id", (req, res, next) => {
    User.find()
    .then( (user) => {
        newPortfolio = user[0].portfolio.filter( (portfolio) => {
          if(portfolio._id != req.params.id) {
            return portfolio;
          }
        })
        user[0].portfolio = newPortfolio;
        user[0].save()
        .then( () => {
            res.status(200).json({
                message: "Portfolio Deleted successfully!",
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