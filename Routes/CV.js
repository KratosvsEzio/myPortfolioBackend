const express = require('express');
const checkAuth = require('../middleware/checkAuth');
const multer = require('multer');
const routes = express.Router();

/* Require User models here */
let User = require('../Models/user.model');

// Define Valid Mime types
const MIMETypes = {
    'application/pdf': 'pdf',
    // 'image/jpg': 'jpg',
    // 'image/gif': 'gif',
    // 'image/jpeg': 'jpg',
    // 'image/png': 'png'
};

// Storing the file on server
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // console.log(file.mimetype);
    const isValid = MIMETypes[file.mimetype];
    let error = new Error("Invalid mime type");
    console.log()
    if(isValid) {
      error = null;
    }
    callback(error, "CV");
  },
  filename: (req, file, callback) => {
    let name = file.originalname.toLowerCase().split('.');
    name = name[0].split(' ').join('')
    const ext = MIMETypes[file.mimetype];
    callback(null, 'Aashir_Azeem_Resume.' + ext);
  }
}); 

// Update Profile CV Route
routes.post("", checkAuth, multer({storage: storage}).single("cv"), (req, res, next) => {
  console.log('hello',req.file);
  User.find()
  .then( (user) => {
      if(req.file){
        const url = req.protocol + "://" + req.get("host");
        // user[0].profile.cvURL =  url + "/CV/" + req.file.filename;
        user[0].profile.cvURL =  url + "/CV/" + 'Aashir_Azeem_Resume.pdf';
      }
      console.log('hello1', user[0].profile.cvURL)
      user[0].save()
      .then( () => {
          res.status(200).json({
              message: "Profile CV updated successfully!",
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