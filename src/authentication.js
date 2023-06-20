const {OktaAuth} = require("@okta/okta-auth-js");

const oktaAuthClient = new OktaAuth({
    issuer: process.env.ISSUER,
    clientId: process.env.CLIENT_ID,
    redirectUri: process.env.REDIRECT_URI,
});


async function login(username, password) {
    const res = await oktaAuthClient.signInWithCredentials({username, password});
    return res;
}

module.exports = {
    login
}