const {OAuth2Client} = require('google-auth-library');

module.exports = (req, res, next) => {
    console.log(req.headers.authorization);
    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
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
    const client = new OAuth2Client('5126203523-es54glrb2p1rd68vehtc371hf17jcvt9.apps.googleusercontent.com');
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: '5126203523-es54glrb2p1rd68vehtc371hf17jcvt9.apps.googleusercontent.com',  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });

    const payload = ticket.getPayload();
    const userId = payload['sub'];
    // If request specified a G Suite domain:
    //const domain = payload['hd'];
    return {userId: userId, exp: ticket.payload.exp};
}