const listHelper = require('../utils/list_helper')
const blogs = require('./test_info').blogs
const emptyList = require('./test_info').emptyList
const listWithOneBlog = require('./test_info').listWithOneBlog

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list is empty, result should be 0', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when the list has multiple blogs, result should be correct', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('when list is empty, result should be empty blog', () => {
    const result = listHelper.favoriteBlog(emptyList)
    expect(result).toEqual({})
  })

  test('when list has only one blog equals that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

  test('when list has multiple blogs, result should be correct', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[2])
  })
})

describe('most blogs', () => {
  test('find author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  })

  test('when list is empty, result should be empty', () => {
    const result = listHelper.mostBlogs(emptyList)
    expect(result).toEqual({})
  })

  test('when list has only one blog equals that author', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 })
  })
})

describe('most likes', () => {
  test('find author with most likes', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  })

  test('when list is empty, result should be empty', () => {
    const result = listHelper.mostLikes(emptyList)
    expect(result).toEqual({})
  })

  test('when list has only one blog equals that author', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 5 })
  })
})