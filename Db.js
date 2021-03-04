const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();


mongoose.connect(`mongodb://${process.env.DATABASE_USER_NAME}:${process.env.DATABASE_USER_PASSWORD}${process.env.DATABASE_URI}`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then( () => {
    console.log("MongoDB Successfully Connected.");
})
.catch( err => {
    console.log("Error in DB connection: " + err);
})