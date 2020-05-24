const express = require('express');
const routes = express.Router();
const nodemailer = require('nodemailer');

// Fetch user data Route
routes.post("", (req, res, next) => {
    const formData = req.body;
    console.log(formData);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'jadude19@gmail.com',
          pass: 'aashirazeem1995'
        }
    });

    var mailOptions = {
      from: "jadude19@gmail.com",
      to: 'aashirazeem771@gmail.com',
      subject: formData.subject,
      html: `
        <ul>
          <li> ${formData.name} </li>
          <li> ${formData.email} </li>
          <li> ${formData.subject} </li>
          <li> ${formData.message} </li>
        <ul>`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
      // transport.close();
    });

    console.log(formData);
    res.status(200).json({
        status: true,
        message: "user data fetched successfully!"
    });
  });

module.exports = routes;