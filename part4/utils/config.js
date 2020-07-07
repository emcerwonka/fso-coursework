require('dotenv').config()

let MONGODB_URI = process.env.MONGODB_URI
let MONGO_OPTS = {
  setDefaultsOnInsert: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}
let PORT = process.env.PORT

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI= process.env.TEST_MONGODB_URI
}

module.exports = {
  MONGODB_URI,
  MONGO_OPTS,
  PORT
}