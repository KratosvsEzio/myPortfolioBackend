const express = require('express');
const checkAuth = require('../middleware/checkAuth');
const mongoose = require('mongoose');
const routes = express.Router();

/* Require User models here */
let User = require('../Models/user.model');

// Create Portfolio Route
routes.post("", checkAuth, (req, res, next) => {
    const project = req.body;
    console.log(req.body);
    User.find()
    .then( (user) => {
        user[0].portfolio.push({ 
            _id: mongoose.Types.ObjectId(),
            img: project.img,
            name: project.name,
            category: project.category,
            demoURL: project.demoURL,
            gitURL: project.gitURL,
            description: {
                frontend: getArrayWithMongooseIds(project.description.frontend),
                backend: getArrayWithMongooseIds(project.description.backend),
                framework: getArrayWithMongooseIds(project.description.framework),
                database: getArrayWithMongooseIds(project.description.database),
                library: getArrayWithMongooseIds(project.description.library),
                font: getArrayWithMongooseIds(project.description.font),
                icon: getArrayWithMongooseIds(project.description.icon),
            }
        });
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

function getArrayWithMongooseIds(array) {
    return array.map( item => {
        return {
            _id: mongoose.Types.ObjectId(),
            name: item.name,
            url: item.url,
            icon: item.icon
        }
    });
}

// Update Portfolio Route
routes.put("/:id", checkAuth, (req, res, next) => {
    const project = req.body;
    console.log('body', project)
    User.updateOne({'portfolio._id': mongoose.Types.ObjectId(req.params.id)}, {
        "portfolio.$.img": project.img,
        "portfolio.$.name": project.name,
        "portfolio.$.category": project.category,
        "portfolio.$.demoURL": project.demoURL,
        "portfolio.$.gitURL": project.gitURL,
        "portfolio.$.description": {
            "frontend": project.description.frontend,
            "backend": project.description.backend,
            "framework": project.description.framework,
            "library": project.description.library,
            "database": project.description.database,
            "font": project.description.font,
            "icon": project.description.icon,
        }
    })
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
routes.delete("/:id", checkAuth, (req, res, next) => {
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