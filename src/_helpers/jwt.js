/**
 * Created by f.putra on 2019-04-02.
 * json web token configuration url
 */
const expressJwt = require('express-jwt');
const config = require('./../config.json');

function jwt() {
    const { secret } = config;
    return expressJwt({ secret }).unless({
        path: [
            // public routes that don't require authentication
            // new RegExp('/.*', 'i')
            // new RegExp('/export.*', 'i'),
            '/users/login',
            '/users/register',

        ]
    });
}

module.exports = jwt;
