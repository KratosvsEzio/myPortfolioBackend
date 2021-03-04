const express = require('express');
const checkAuth = require('../middleware/checkAuth');
const mongoose = require('mongoose');
const routes = express.Router();

/* Require User models here */
let User = require('../Models/user.model');

// Create Education Route
routes.post("", checkAuth, (req, res, next) => {
    User.find()
    .then( (user) => {
        user[0].education.push({ 
            _id: mongoose.Types.ObjectId(),
            date: req.body.date,
            degree: req.body.degree,
            institution: req.body.institution
        })
        user[0].save()
        .then( () => {
            res.status(200).json({
                message: "Education created successfully!",
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

// Update Education Route
routes.put("/:id", checkAuth, (req, res, next) => {
    User.updateOne({'education._id': mongoose.Types.ObjectId(req.params.id)}, {
        "education.$.date": req.body.date,
        "education.$.degree": req.body.degree,
        "education.$.institution": req.body.institution,
    } )
    .then( (results) => {
        res.status(200).json({
            message: "Education updated successfully!",
            status: true
        });
    })
    .catch( err => {
        console.log(err.message);
    });
});

// Delete Education Route
routes.delete("/:id", checkAuth, (req, res, next) => {
    User.find()
    .then( (user) => {
        newEducation = user[0].education.filter( (education) => {
          if(education._id != req.params.id) {
            return education;
          }
        })
        user[0].education = newEducation;
        user[0].save()
        .then( () => {
            res.status(200).json({
                message: "Education Deleted successfully!",
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