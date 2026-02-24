const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const noteRouter = require('./controllers/notes')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const app = express()

logger.info(`Connecting to ${config.MONGODB_URI}`)

mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connection to MongoDB', error.message)
  })

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', noteRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.listen(config.PORT, () => {
  logger.info(`Server running on ${config.PORT}`)
})

module.exports = app
