const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./contollers/blogs')
const loginRouter = require('./contollers/login')
const userRouter = require('./contollers/users')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
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

app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use(middleware.tokenManager)
app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app