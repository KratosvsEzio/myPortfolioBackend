const mongoose = require('mongoose');

mongoose.connect('mongodb://AashirAzeem:xi2v4pjJ34IkdNrt@cluster0-shard-00-00-unchd.mongodb.net:27017,cluster0-shard-00-01-unchd.mongodb.net:27017,cluster0-shard-00-02-unchd.mongodb.net:27017/User?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', 
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