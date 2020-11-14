import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

const testBlog = {
  title: 'test title',
  author: 'test author',
  url: 'test url',
  likes: 25
}

test('<Blog /> renders title and author by default', () => {

  const component = render(
    <Blog blog={testBlog} />
  )

  const simpleBlogView = component.container.querySelector('.simpleBlog')
  expect(simpleBlogView).toBeDefined()
  expect(simpleBlogView).not.toHaveStyle('display: none')

  const detailBlogView = component.container.querySelector('.detailBlog')
  expect(detailBlogView).toBeDefined()
  expect(detailBlogView).toHaveStyle('display: none')
})

test('<Blog /> renders url and likes when visibility is toggled', () => {

  const component = render(
    <Blog blog={testBlog} />
  )
  const showDetailsButton = component.container.querySelector('.showDetails')
  fireEvent.click(showDetailsButton)

  const simpleBlogView = component.container.querySelector('.simpleBlog')
  expect(simpleBlogView).toBeDefined()
  expect(simpleBlogView).toHaveStyle('display: none')

  const detailBlogView = component.container.querySelector('.detailBlog')
  expect(detailBlogView).toBeDefined()
  expect(detailBlogView).not.toHaveStyle('display: none')
})

test('<Blog /> like button functions properly', () => {
  const mockHandler = jest.fn()

  const component = render(
    <Blog
      blog={testBlog}
      addLike={mockHandler}
    />
  )

  const showDetailsButton = component.container.querySelector('.showDetails')
  fireEvent.click(showDetailsButton)

  const addLikeButton = component.container.querySelector('.likeButton')
  fireEvent.click(addLikeButton)
  fireEvent.click(addLikeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})