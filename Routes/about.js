const express = require('express');
// const checkAuth = require('../middleware/check-auth');
const mongoose = require('mongoose');
const routes = express.Router();

/* Require User models here */
let User = require('../Models/user.model');

// Update Portfolio Route
routes.put("", (req, res, next) => {
    User.find()
    .then( (user) => {
        if(req.body.completedProjects && req.body.workingOn && req.body.aboutMe){
            user[0].projects = {
                completedProjects: req.body.completedProjects,
                workingOn: req.body.workingOn
            };
            user[0].aboutMe = req.body.aboutMe;
        }
        user[0].save()
        .then( () => {
            res.status(200).json({
                message: "About me updated successfully!",
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