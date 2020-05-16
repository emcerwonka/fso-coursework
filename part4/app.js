const blogsRouter = require('./contollers/blogs')
const config = require('./utils/config')
const cors = require('cors')
const express = require('express')
const app = express()
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI, config.MONGO_OPTS)

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app