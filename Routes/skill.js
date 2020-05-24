const express = require('express');
// const checkAuth = require('../middleware/check-auth');
const mongoose = require('mongoose');
const routes = express.Router();

/* Require User models here */
let User = require('../Models/user.model');

// Create Skill Route
routes.post("", (req, res, next) => {
    User.find()
    .then( (user) => {
        user[0].skills.push({ _id: mongoose.Types.ObjectId(), skill: req.body.skill })
        user[0].skillCount++;
        user[0].save()
        .then( () => {
            res.status(200).json({
                message: "Skill created successfully!",
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

// Update Skill Route
routes.put("/:id", (req, res, next) => {
    User.updateOne({'skills._id': mongoose.Types.ObjectId(req.params.id)}, {"skills.$.skill": req.body.skill} )
    .then( (results) => {
        res.status(200).json({
            message: "Skill updated successfully!",
            status: true
        });
    })
    .catch( err => {
        console.log(err.message);
    });
});

// Delete Skill Route
routes.delete("/:id", (req, res, next) => {
    User.find()
    .then( (user) => {
        newSkills = user[0].skills.filter( (skill) => {
            if(skill._id != req.params.id) {
                return skill;
            }
        })
        user[0].skills = newSkills;
        user[0].skillCount--;

        user[0].save()
        .then( () => {
            res.status(200).json({
                message: "Skill Deleted successfully!",
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