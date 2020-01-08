/**
 * Created by f.putra on 25/06/18.
 * utilities for helping you any situation this can be abstract function
 */
let moment = require('moment/moment')
let utils = {
    doResponse: (res, status, body) => {
        return res.status(status).json({status: status, message: body})
    },
    sendFailedResponse: (res, message, body) => {
        return res.json({
            status: false,
            message: message,
            body: body
        })
    },
    sendSuccessResponse: (res, status, message, body) => {
        return res.json({
            status: true,
            message: message,
            body: body
        })
    },

    parsingDate: (time) => {
        return moment(time).add(1, 'days').format("YYYY/MM/DD")
    },
    generateCartCode: (id) => {
        return moment(new Date()).format("YYYY/MM/DD") + "C" + id + Math.floor(Math.random() * 1000);
    },
    generateCheckoutCode: (id) => {
        return "CO" + id + Math.floor(Math.random() * 1000) + "INV" + moment(new Date()).format("YYYY/MM/DD");
    },
    timeStringToFloat: (time) => {
        return parseInt(time.split(/[.:]/)[0], 10) + (time.split(/[.:]/)[1] ? parseInt(time.split(/[.:]/)[1], 10) : 0) / 60;
    },

    findWeekNumber(date) {
        return Math.ceil(moment(date).date() / 7)
    },
};
module.exports = utils;
