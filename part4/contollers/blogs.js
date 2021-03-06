const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const { blogs } = require('../tests/test_info')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.token

  const creator = await User.findById(token.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    likes: body.likes,
    url: body.url,
    user: creator._id
  })

  const savedBlog = await blog.save()
  creator.blogs = creator.blogs.concat(savedBlog._id)
  await creator.save()

  response.status(201).json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token

  const creator = await User.findById(token.id)
  const blog = await Blog.findById(request.params.id)
  const blogUserId = blog.user.toString()
  logger.info(blogUserId)

  if (!(creator.id.toString() === blogUserId)) {
    return response.status(401).json({
      error: 'This user does not have authorization to delete the specified blog.'
    })
  }

  await Blog.findByIdAndRemove(blog.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, { new: true })
  response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter