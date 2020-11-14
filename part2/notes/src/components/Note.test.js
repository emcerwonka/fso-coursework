import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Note from './Note'

const note = {
  content: 'Component testing is done with react-testing-library',
  important: true
}

test('renders content', () => {
  const component = render(
    <Note note={note} />
  )

  // Useful methods for debugging
  // const li = component.container.querySelector('li')
  // console.log(prettyDOM(li))
  // component.debug()

  // method 1
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

  // method 2
  const element = component.getByText(
    'Component testing is done with react-testing-library'
  )
  expect(element).toBeDefined()

  // method 3
  const div = component.container.querySelector('.note')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})

test('clicking the button calls event handler once', () => {
  const mockHandler = jest.fn()

  const component = render(
    <Note note={note} toggleImportance={mockHandler} />
  )

  const button = component.getByText('Make unimportant')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})