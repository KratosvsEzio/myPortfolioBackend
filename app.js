const express = require('express');
const bodyParser= require('body-parser');
const path = require("path");

// Routes
const userRoutes = require('./Routes/user');
const profileCVRoutes = require('./Routes/CV');
const skillRoutes = require('./Routes/skill');
const profileRoutes = require('./Routes/profile');
const profileImageRoutes = require('./Routes/profileImage');
const aboutRoutes = require('./Routes/about');
const educationRoutes = require('./Routes/education');
const experienceRoutes = require('./Routes/experience');
const portfolioRoutes = require('./Routes/portfolio');
const sendEmailRoutes = require('./Routes/sendEmail');
const loginRoutes = require('./Routes/login');

require('./Db');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/Images/ProfileImage", express.static(path.join("Images/ProfileImage")));
app.use("/CV", express.static(path.join("CV")));

app.use('/api/user',userRoutes);
app.use('/api/profile',profileRoutes);
app.use('/api/profileImage',profileImageRoutes);
app.use('/api/CV',profileCVRoutes);
app.use('/api/about',aboutRoutes);
app.use('/api/skill',skillRoutes);
app.use('/api/education',educationRoutes);
app.use('/api/experience',experienceRoutes);
app.use('/api/portfolio',portfolioRoutes);
app.use('/api/sendEmail',sendEmailRoutes);
app.use('/api/login',loginRoutes);

module.exports = app;