const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const blogList = require('./test_info').blogs
const userList = require('./test_info').users
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const { users } = require('./test_info')

beforeEach(async () => {
  await User.deleteMany({})

  for (let user of userList) {
    let userObject = new User(user)
    userObject.passwordHash = await bcrypt.hash(user.password, 10)
    await userObject.save()
  }

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

    const userLogin = {
      'username': 'gwil0S',
      'password': 'swillumulliws'
    }

    const loginResponse = await api.post('/api/login').send(userLogin)
    const token = loginResponse.body.token

    await api.post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
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

    const userLogin = {
      'username': 'gwil0S',
      'password': 'swillumulliws'
    }

    const loginResponse = await api.post('/api/login').send(userLogin)
    const token = loginResponse.body.token

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
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

    const userLogin = {
      'username': 'gwil0S',
      'password': 'swillumulliws'
    }

    const loginResponse = await api.post('/api/login').send(userLogin)
    const token = loginResponse.body.token

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(badBlog)
      .expect(400)
  })

  test('blog can be deleted', async () => {
    const newBlog = new Blog({
      title: 'Big Sad Bois',
      author: 'James Weston',
      url: 'www.bsb.com',
      likes: '22'
    })

    const userLogin = {
      'username': 'gwil0S',
      'password': 'swillumulliws'
    }

    const loginResponse = await api
      .post('/api/login')
      .send(userLogin)
    const token = loginResponse.body.token

    const postResponse = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
    const blogToDelete = postResponse.body


    const blogsInDb = await api.get('/api/blogs')

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
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

describe('users api tests', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    for (let user of userList) {
      let userObject = new User(user)
      await userObject.save()
    }
  })

  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all users are returned', async () => {
    const response = await api.get('/api/users')

    expect(response.body).toHaveLength(userList.length)
  })

  test('new user can be created', async () => {
    const usersBeforeTest = await api.get('/api/users')

    const newUser = new User({
      name: 'New Guy',
      username: 'heyimnew',
      password: 'somedumbsecret'
    })

    await newUser.save()
    const usersAfterTest = await api.get('/api/users')
    expect(usersAfterTest.body).toHaveLength(usersBeforeTest.body.length + 1)

    const usernames = usersAfterTest.body.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('new username must be longer than 3 characters', async () => {
    const shortusername = {
      username: 'Ne',
      name: 'hmnew',
      password: 'somecret'
    }

    const response = await api.post('/api/users').send(shortusername).expect(400)
    expect(response.body.error)
      .toContain('shorter than the minimum allowed length (3).')
  })

  test('new user must have password', async () => {
    const nopassword = {
      name: 'New Guy',
      username: 'heyimnew'
    }

    const response = await api.post('/api/users').send(nopassword).expect(400)
    expect(response.body.error)
      .toContain('New Users must specify a password.')
  })

  test('new user must have username', async () => {
    const nousername = {
      name: 'New Guy',
      password: 'somedumbsecret'
    }

    const response = await api.post('/api/users').send(nousername).expect(400)
    expect(response.body.error)
      .toContain('User validation failed: username: Path `username` is required.')
  })
})

afterAll(() => {
  mongoose.connection.close()
})