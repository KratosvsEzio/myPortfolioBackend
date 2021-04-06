const express = require('express');
const checkAuth = require('../middleware/checkAuth');
const mongoose = require('mongoose');
const routes = express.Router();

/* Require User models here */
let User = require('../Models/user.model');

// Create Experience Route
routes.post("", checkAuth, (req, res, next) => {
    User.find()
    .then( (user) => {
        user[0].experience.push({ 
            _id: mongoose.Types.ObjectId(),
            date: req.body.date,
            designation: req.body.designation,
            institution: req.body.institution
        })
        user[0].save()
        .then( () => {
            res.status(200).json({
                message: "Experience created successfully!",
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

// Update Experience Route
routes.put("/:id", checkAuth, (req, res, next) => {
    User.updateOne({'experience._id': mongoose.Types.ObjectId(req.params.id)}, {
        "experience.$.date": req.body.date,
        "experience.$.designation": req.body.designation,
        "experience.$.institution": req.body.institution,
    } )
    .then( (results) => {
        res.status(200).json({
            message: "Experience updated successfully!",
            status: true
        });
    })
    .catch( err => {
        console.log(err.message);
    });
});

// Delete Experience Route
routes.delete("/:id", checkAuth, (req, res, next) => {
    User.find()
    .then( (user) => {
        newExperience = user[0].experience.filter( (experience) => {
          if(experience._id != req.params.id) {
            return experience;
          }
        })
        user[0].experience = newExperience;
        user[0].save()
        .then( () => {
            res.status(200).json({
                message: "Experience Deleted successfully!",
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