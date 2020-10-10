const logger = require('./logger')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    return authorization.substring(7)
  }
  return null
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformed ID' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const tokenManager = (request, response, next) => {
  const decodedToken = jwt.decode(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken || !decodedToken.id) {
    return response.status(401).json({
      error: 'Token missing or invalid'
    })
  }

  request.token = decodedToken
  next()
}

const requestLogger = (request, response, next) => {
  logger.info('Method: ', request.method)
  logger.info('Path: ', request.path)
  logger.info('Body: ', request.body)
  logger.info('- - - - - -')
  next()
}

const unknownEndpoint = (request, response, next) => {
  response.status(404).send({
    error: 'Unknown endpoint.'
  })
}

module.exports = {
  errorHandler,
  requestLogger,
  tokenManager,
  unknownEndpoint
}