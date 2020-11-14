import React from 'react'
import CreateBlogForm from './CreateBlogForm'
import { fireEvent, render } from '@testing-library/react'

const testTitle = 'test title'
const testAuthor = 'test author'
const testUrl = 'test url'

test('<CreateBlogForm /> calls handler with correct details', () => {
  const mockHandler = jest.fn()

  const component = render(
    <CreateBlogForm createBlog={mockHandler} />
  )

  const createBlogForm = component.container.querySelector('.createBlogForm')
  const titleInput = component.container.querySelector('.title')
  fireEvent.change(titleInput, {
    target: { value: testTitle }
  })
  const authorInput = component.container.querySelector('.author')
  fireEvent.change(authorInput, {
    target: { value: testAuthor }
  })
  const urlInput = component.container.querySelector('.url')
  fireEvent.change(urlInput, {
    target: { value: testUrl }
  })
  fireEvent.submit(createBlogForm)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0]).toBe(testTitle)
  expect(mockHandler.mock.calls[0][1]).toBe(testAuthor)
  expect(mockHandler.mock.calls[0][2]).toBe(testUrl)
})