const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB = require('./databases/database');

// Connect to the database
connectDB();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const gamesRouter = require('./routes/games');
const gameLineupsRouter = require('./routes/gameLineups');
const gameEventsRouter = require('./routes/gameEvents');
const careerRoutes = require('./routes/career');
const rankingsRoutes = require('./routes/rankings');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', usersRouter);
app.use('/api', gamesRouter);
app.use('/api', gameLineupsRouter);
app.use('/api', gameEventsRouter);
app.use('/api', careerRoutes);
app.use('/api', rankingsRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Set the port to 3002
const port = 3002;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
