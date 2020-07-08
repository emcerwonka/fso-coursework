const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const blogList = require('./test_info').blogs
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of blogList) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('api test', () => {
  test('blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(blogList.length)
  })

  test('id property exists', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => expect(blog.id).toBeDefined())
  })

  test('new blog can be created', async () => {
    const newBlog = new Blog({
      title: 'Big Bad Dumb Bois',
      author: 'James Weston',
      url: 'www.bbdb.com',
      likes: '15'
    })

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterTest = await api.get('/api/blogs')
    expect(blogsAfterTest.body).toHaveLength(blogList.length + 1)

    const blogTitles = blogsAfterTest.body.map(blog => blog.title)
    expect(blogTitles).toContain('Big Bad Dumb Bois')
  })

  test('default likes should be 0', async () => {
    const newBlog = new Blog({
      title: 'The Most Horrible page in The Universe',
      author: 'Maddox',
      url: 'www.thissiteisshite.edu'
    })

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterTest = await api.get('/api/blogs')
    const blogUnderTest = blogsAfterTest.body.find(blog => blog.title === newBlog.title)
    expect(blogUnderTest.likes).toEqual(0)
  })

  test('new blog without title or url should be rejected', async () => {
    const badBlog = new Blog({
      author: 'Mr Irresponsible',
      likes: 100000000
    })

    await api
      .post('/api/blogs')
      .send(badBlog)
      .expect(400)
  })

  test('blog can be deleted', async () => {
    const blogsInDb = await api.get('/api/blogs')
    const blogToDelete = blogsInDb.body[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAfterTest = await api.get('/api/blogs')
    expect(blogsAfterTest.body).toHaveLength(blogsInDb.body.length - 1)

    const titles = blogsAfterTest.body.map(blog => blog.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('blog can be updated', async () => {
    const blogsInDb = await api.get('/api/blogs')
    const blogToUpdate = blogsInDb.body[0]

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({
        title: 'New In Town',
        author: 'John Mulaney',
        likes: '8004',
        url: 'www.NiT.com'
      })
      .expect(200)

    const blogsAfterTest = await api.get('/api/blogs')
    const titles = blogsAfterTest.body.map(blog => blog.title)
    expect(titles).toContain(response.body.title)
    expect(titles).not.toContain(blogToUpdate.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})