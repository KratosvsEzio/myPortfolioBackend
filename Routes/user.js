const express = require('express');
const routes = express.Router();

/* Require User models here */
let User = require('../Models/user.model');

let user = {
  profile: {
    name: "aashir azeem",
    image: "Aashir.jpg",
    address: "Bahria Town, Lahore, Pakistan",
    email: "aashirazeem771@gmail.com",
    specialization: "Front-End Web Developer",
    recentDegree: "BS Computer Engineering",
    githubURL: "https://github.com/KratosvsEzio",
    cvURL: "https://drive.google.com/open?id=1ve-xf4VvXJQpMNruoUbvttitWDz4n2_2"
  },
  skills: [
    {
      skill: 'Mean Stack'
    },
    {
      skill: 'Angular 7(TS)'
    },
    {
      skill: 'Node Js'
    },
    {
      skill: 'Express'
    },
    {
      skill: 'Mongo DB'
    },
    {
      skill: 'SQL'
    },
    {
      skill: 'HTML'
    },
    {
      skill: 'CSS3'
    },
    {
      skill: 'Bootstrap 4'
    },
    {
      skill: 'Angular Material'
    },
    {
      skill: 'Javascript'
    },
    {
      skill: 'Jquery'
    },
    {
      skill: 'PHP'
    },
    {
      skill: 'Socket.io'
    },
    {
      skill: 'Animate CSS'
    },
    {
      skill: 'WOW.js'
    },
    {
      skill: 'AOS(Animate On Scroll).js'
    },
    {
      skill: 'ImageSlider.js'
    },
    {
      skill: 'Owl-carousel'
    },
    {
      skill: 'Headroom.js'
    },
    {
      skill: 'Ripple.js'
    },
    {
      skill: 'Isotope.js'
    },
    {
      skill: 'Nice-Select'
    },
    {
      skill: 'Magnific-Popup'
    },
  ],
  skillCount: 24,
  aboutMe: "Hi There, I’m Aashir Azeem and I am Front-End Web Developer. It's been 1 year, I’m working as web developer. I have developed many PSD templates and also provided my services to college students by getting their projects ready ASAP as a freelancer. I have also worked on few MEAN Stack Projects, which was a great experience for me. Currently I'm studying React js and looking forward to to do some MERN stack projects too.",
  projects: {
    completedProjects: 2,
    workingOn: 2
  },
  education: [
    {
      date: '2013 - 2018',
      degree: 'BS Computer Engineering',
      institution: 'COMSATS University Islamabad, Lahore Campus'
    },
    {
      date: '2011 - 2013',
      degree: 'FSc. (Pre-Engineering)',
      institution: 'Punjab Group of Colleges, Lahore'
    }
  ],
  portfolio: [
    {
      img: 'Aashir.jpg',
      category: 'angular',
      demoURL: '#',
      gitURL: '#'
    },
    {
      img: 'defaultUser.jpg',
      category: 'mean',
      demoURL: '#',
      gitURL: '#'
    }
  ]
}

// Fetch user data Route
routes.get("", (req, res, next) => {

  // user = new User({});
  // user.save(); 

  User.find()
  .then( (results) => {
    res.status(200).json({
      message: "user data fetched successfully!",
      data: results[0]
    });
  })
  .catch( err => {
    console.log(err.message)
  })

});

module.exports = routes;