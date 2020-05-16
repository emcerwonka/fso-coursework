require('dotenv').config()

let MONGODB_URI = process.env.MONGODB_URI
let MONGO_OPTS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}
let PORT = process.env.PORT

module.exports = {
  MONGODB_URI,
  MONGO_OPTS,
  PORT
}