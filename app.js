let express = require('express');
let createError = require('http-errors');
let cron = require("node-cron");
let fs = require("fs");
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors')
let path = require('path');
let {errorHandlers, jwt} = require('./_helpers');

let usersRouter = require('./controller/UserController');
let laporanRouter = require('./controller/LaporanController');
let dashboardRouter = require('./controller/DashboardController');
let laporanService = require('./services/LaporanServices');

let app = express();
app.listen(process.env.LISTEN_PORT);
let corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(jwt());

app.use('/users', usersRouter);
app.use('/laporan', laporanRouter);
app.use('/dashboard', dashboardRouter);
cron.schedule("0 */24 * * *", function () {
    laporanService.findAll().then(res => {
        res.rows.map(value => {
            laporanService.updateColor(value)
        })
        console.log("---------------------");
        console.log("Running Cron Job");
    })
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(errorHandlers);
module.exports = app;
