import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import {prettyDOM} from '@testing-library/dom'
import Toggle from './Toggle'

describe('Toggle', () => {
  const buttonLabel = 'show'
  let component

  beforeEach(() => {
    component = render(
      <Toggle buttonLabel={buttonLabel}>
        <h1>hola</h1>
      </Toggle>
    )
  })

  test('renders its childen', () => {
    component.getByText('hola')
  })

  test('renders its childen', () => {
    const el = component.getByText('hola')
    expect(el.parentNode).toHaveStyle('display: none')
  })

  test('cliks', () => {
    const button = component.getByText(buttonLabel)
    fireEvent.click(button)

    const el = component.getByText('hola')
    expect(el.parentNode).not.toHaveStyle('display: none')
  })

  test('cancel', () => {
    const button = component.getByText(buttonLabel)
    fireEvent.click(button)

    const el = component.getByText('hola')
    expect(el.parentNode).not.toHaveStyle('display: none')

    const cancelButton = component.getByText('Close')
    fireEvent.click(cancelButton)

    expect(el.parentNode).toHaveStyle('display: none')
  })
})