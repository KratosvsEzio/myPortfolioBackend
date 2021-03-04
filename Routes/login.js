const express = require('express');
const routes = express.Router();
const {OAuth2Client} = require('google-auth-library');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config();
// Create login Route
routes.post("", (req, res, next) => {
    try {
        verify(req.body.tokenId).then( user => {
            console.log('user', user);
            if(user && user.userId == "104866913049932130993" && user.email == "jadude19@gmail.com") {
                const token = jwt.sign({user}, process.env.SECRET_KEY, {expiresIn: user.exp});
                res.status(201).json({
                    expiresIn: user.exp,
                    message: "Authentication Successful !",
                    token: token
                });
            } else {
                res.status(401).json({
                    message: "Authentication failed! Token Id is invalid.",
                });
            }
        });
    } catch(err) {
        res.status(401).json({
            message: "Authentication failed",
        });
    }
});

async function verify(tokenId) {
    try {
        const client = new OAuth2Client(process.env.CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
    
        const payload = ticket.getPayload();
        // If request specified a G Suite domain:
        //const domain = payload['hd'];
        return {userId: payload.sub, userName: payload.name, email: payload.email, exp: payload.exp};
    } catch (err) {
        console.log('Error', err)
        return null;
    }
};

module.exports = routes;