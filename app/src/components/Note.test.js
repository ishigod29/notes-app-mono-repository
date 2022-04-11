import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import {prettyDOM} from '@testing-library/dom'
import Note from './Note'

test('renders content', () => {

  const note = {
    content: 'hola',
    important: true
  }

  const component = render(<Note note={note}/>)

  component.debug()

  component.getByText('hola')
  component.getByText('is important')
  //expect(component.container).toHaveTextContent('is important')
})

test('button click', () => {

  const note = {
    content: 'hola',
    important: true
  }

  const mockHandler = jest.fn()

  const component = render(<Note note={note} toggleImportanceOf={mockHandler}/>)

  const button = component.getByText('is important')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)

  
})