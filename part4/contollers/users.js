const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.status(200).json(users)
})

userRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash: hashedPassword
  })

  const savedUser = await user.save()
  response.json(savedUser)
})

module.exports = userRouter