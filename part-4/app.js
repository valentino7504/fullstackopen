const express = require('express');
const app = express();
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
const config = require('./utils/config');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const middleware = require('./utils/middleware');

const mongoUrl = config.MONGO_URL;

mongoose.set('strictQuery', false);
logger.info('connecting to mongodbl');
mongoose.connect(mongoUrl)
  .then(() => logger.info('successfully connected to mongodb'))
  .catch(error => logger.error('could not connect to mongodb:', error.message));

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.get('/', (req, res) => res.send('Hello World'));

app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
