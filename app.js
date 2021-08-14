var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { swaggerUi, specs } = require('./common/swagger');
var cors = require('cors');
var indexRouter = require('./routes/index');
var testRouter = require('./routes/test');
var questionBoxRouter = require('./routes/question-box');
var themeRouter = require('./routes/theme');

var todayQuestionRouter = require('./routes/today-question');
var everyoneQuestionRouter = require('./routes/everyone-question');
var reactAnswerRouter = require('./routes/react-answer');
var reactQuestionRouter = require('./routes/react-question');
var voteQuestionRouter = require('./routes/vote-question');

var dotenv = require('dotenv');
if (process.env.NODE_ENV == 'dev') {
  dotenv.config({
    path: path.resolve(process.cwd(), ".env")
  });
}
var mysqlConnection = require('./common/db_pool')(process.env.DB_HOST, process.env.DB_USER, 
  process.env.DB_PASSWORD, process.env.DB_DATABASE, process.env.DB_PORT);

var app = express();

let headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type, Cache-Control',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*'
};
app.use(cors(headers));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  req.database = mysqlConnection;
  next();
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/', indexRouter);
app.use('/test', testRouter);

app.use('/question-box', questionBoxRouter);
app.use('/theme', themeRouter);
app.use('/today-question', todayQuestionRouter);
app.use('/everyone-question', everyoneQuestionRouter);
app.use('/react-answer', reactAnswerRouter);
app.use('/react-question', reactQuestionRouter);
app.use('/vote-question', voteQuestionRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
