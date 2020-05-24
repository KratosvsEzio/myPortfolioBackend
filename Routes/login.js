const express = require('express');
const checkAuth = require('../middleware/checkAuth');
const routes = express.Router();

// Create login Route
routes.get("", checkAuth, (req, res, next) => {
    if ( req.auth !== null && req.auth.userId && req.auth.userId === "104866913049932130993") {
        res.status(201).json({
            expiresIn: req.auth.exp,
            message: 'Authentication Successful !',
            status: true
        })
    } else {
        res.status(401).json({
            message: "Authentication failed",
            status: false,
        });
    }
});

module.exports = routes;