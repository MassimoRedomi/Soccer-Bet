const createError = require('http-errors');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swaggerConfig');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB = require('./databases/database')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
const gamesRouter = require('./routes/games');
const gameLineupsRouter = require('./routes/gameLineups');
const gameEventsRouter = require('./routes/gameEvents');
const careerRoutes = require('./routes/career');
const rankingsRoutes = require('./routes/rankings');

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

// Swagger API documentation setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
