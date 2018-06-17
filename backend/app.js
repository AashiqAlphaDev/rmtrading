const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const routes = require("./routes");
const express = require('express');
const app = express();

app.use(session({
	secret: '21euwd8oilk12evqwdsuiekiqewjgdascyu12kueqwjgdsui1kyqwu',
	store: require("./session-store"),
	resave: true,
	saveUninitialized: true
}));

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
	res.header('Access-Control-Allow-Credentials', true);
	res.header("Access-Control-Allow-Origin", "http://localhost:3001");
	res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With, Content-Type,Accept");
	next()
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(routes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	console.error(err.stack)
    res.status(err.statusCode).send({message:err.message});
});

module.exports = app;
