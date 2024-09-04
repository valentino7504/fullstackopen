const logger = require('./logger');

const requestLogger = (req, res, next) => {
  res.on('finish', () =>
    logger.info(
      `${req.method} ${req.path} ${res.statusCode} ${res.get('Content-Length')}`
    )
  );
  next();
};

const unknownEndpoint = (req, res) => res.status(404).json({ error: 'unknown endpoint' });

const errorHandler = (req, res, next, error) => {
  logger.error(error.message);
  if (error.name === 'CastError')
    return res.status(400).json({ error: 'malformatted id' });
  else if (error.name === 'ValidationError')
    return res.status(400).json({ error: error.message });
  next(error);
};

module.exports = { requestLogger, unknownEndpoint, errorHandler };
