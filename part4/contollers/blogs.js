const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})

  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

<<<<<<< HEAD
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog.toJSON())
=======
  blog
    .save()
    .then(blog => {
      if (blog) {
        response.status(201).json(blog.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
>>>>>>> e2bdb78056a9eb82a07e2d188d9e00768290737f
})

module.exports = blogsRouter