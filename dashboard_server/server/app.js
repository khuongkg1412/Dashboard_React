var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyPaser = require('body-parser');
const session = require('express-session');

var app = express();
app.use(
    session({
        secret: "subscripeawdawdadwwfthfh123",
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            expires: 30 * 60 * 1000
        }
    })
);
app.use(bodyPaser.urlencoded({ extended: true }));
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var indexRouter = require('./Route/index');
var profileRouter = require('./Route/profile');
var adminManagerRouter = require('./Route/adminManager');
var userManagerRouter = require('./Route/userManager');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/profile', profileRouter);
app.use('/usermanager', userManagerRouter );
app.use('/adminmanager', adminManagerRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;