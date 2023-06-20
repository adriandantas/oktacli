#!/usr/bin/env node
require('dotenv').config()
const prompt = require('prompt');
const auth = require('./authentication');
const colors = require("@colors/colors/safe");

var schema = {
    properties: {
        username: {
            description: colors.green('Username'),
            type: 'string',
            required: true
        },
        password: {
            description: colors.green('Password'),
            type: 'string',
            required: true,
            hidden: true,
            replace: '*'
        }
    }
};

prompt.message = ''

prompt.start();

prompt.get(schema, async function (err, result) {
    if (err) {
        return onErr(err);
    }
    try {
        const res = await auth.login(result.username, result.password);
        if (res.status === 'SUCCESS') {
            console.log('User login successful');
        } else {
            console.log('Login failed');
        }
    } catch (err) {
        console.error('Failed to login:', err.message);
    }
    ;
});

function onErr(err) {
    console.log(err);
    process.exit(1);
}
