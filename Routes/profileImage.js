const express = require('express');
// const checkAuth = require('../middleware/check-auth');
const multer = require('multer');
const routes = express.Router();

/* Require User models here */
let User = require('../Models/user.model');

// Define Valid Mime types
const MIMETypes = {
    'image/jpg': 'jpg',
    'image/gif': 'gif',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// Storing the file on server
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const isValid = MIMETypes[file.mimetype];
    let error = new Error("Invalid mime type")
    if(isValid) {
      error = null;
    }
    callback(error, "Images/ProfileImage");
  },
  filename: (req, file, callback) => {
    let name = file.originalname.toLowerCase().split('.');
    name = name[0].split(' ').join('')
    const ext = MIMETypes[file.mimetype];
    callback(null, name + '-' + Date.now() + '.' + ext)
  }
}); 

// Update Profile Image Route
routes.post("", multer({storage: storage}).single("image"), (req, res, next) => {
  console.log('hello',req.file);
  User.find()
  .then( (user) => {
      if(req.file){
          const url = req.protocol + "://" + req.get("host");
          user[0].profile.image =  url + "/Images/ProfileImage/" + req.file.filename;
      }
      console.log('hello1', user[0].profile.image)
      user[0].save()
      .then( () => {
          res.status(200).json({
              message: "Profile Image updated successfully!",
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