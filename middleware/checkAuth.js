const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '5126203523-o4445m07k6m6kjj9313p8flpd2meqmpd.apps.googleusercontent.com';
module.exports = (req, res, next) => {
    console.log(req.headers.authorization);
    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        console.log('Next');
        console.log('Next');
        console.log('Next');
        if (token !== 'null') {
            auth = verify(token)
            .then((res) => {
                req.auth = res;
                next();
            })
            .catch(console.error);
        } else {
            console.log('hello1');
            req.auth = null;
            next();
        }
    } catch( err ){
        res.status(401).json({
            message: "Auth failed",
            error: err
        });
    }
}
async function verify(token) {
    const client = new OAuth2Client(CLIENT_ID);
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });

    const payload = ticket.getPayload();
    const userId = payload['sub'];
    // If request specified a G Suite domain:
    //const domain = payload['hd'];
    return {userId: userId, exp: ticket.payload.exp};
}