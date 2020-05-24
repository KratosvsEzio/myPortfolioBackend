const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema({
    profile: {
        name: {type : String },
        image: {type : String },
        address: {type : String },
        email: {type : String },
        specialization: {type : String },
        recentDegree: {type : String },
        githubURL: {type : String },
        cvURL: {type : String },
    },
    aboutMe: {type : String },
    projects: {
        completedProjects: {type : Number },
        workingOn: {type : Number }
    },
    education: [{
        date: {type : String },
        degree: {type : String },
        institution: {type : String },
    }],
    portfolio: [{
        img: {type : String },
        name: {type : String },
        category: {type : String },
        demoURL: {type : String },
        gitURL: {type : String },
    }],
    skills: [{
        skill: {type : String },
    }],
    skillCount: {type : Number },
    // description : {type : String, default: 'add group description'},
});

module.exports = mongoose.model('User',userSchema);
