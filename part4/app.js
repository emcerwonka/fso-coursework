const blogsRouter = require('./contollers/blogs')
const config = require('./utils/config')
const cors = require('cors')
const express = require('express')
const app = express()
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

logger.info('Connecting to : ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, config.MONGO_OPTS)
  .then(() => {
    logger.info('Connected to MongoDB.')
  })
  .catch(error => {
    logger.error('Error connecting to mongo', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app