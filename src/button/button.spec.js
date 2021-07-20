import fs from 'fs'
import { join } from 'path'
import * as pug from 'pug'
import { getByRole } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'

const getMixin = (component) => fs.readFileSync(join(__dirname, './', `${component}.pug`), 'utf8')

const render = (component, options) => {
  let template = `${getMixin(component)}\n+${component}(options)`
  return pug.compile(template, {
    pretty: true,
    filename: join(__dirname, './', `${component}.pug`),
  })({ options })
}

const html = render('button', { text: 'Tenho interesse' })

let dom
let container

describe('button unit testing', () => {
  beforeEach(() => {
    dom = new JSDOM(html)
    container = dom.window.document.body
  })

  it('renders a button element', () => {
    expect(getByRole(container, 'button', { name: /Tenho interesse/i })).toBeInTheDocument()
  })
})