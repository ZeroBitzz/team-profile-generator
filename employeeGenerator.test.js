import {writeHtmlFile, createHtml} from './employeeGenerator'
import fs from "fs";
import {jest} from '@jest/globals'

describe('create a HTML template from answers', () => {
  it('should generate html using employee list', () => {
    // Arrange
    const employees = [{
      name: 'Brodi Howell',
      role: 'Engineer',
      email: 'zerothesu@gmail.com',
      github: 'zerobitzz',
    }]

    // Act
    const html = createHtml(employees)

    // Assert
    const expectedResult = `<html><head><link rel="stylesheet" href="./style.css"><title>Employees</title></head>` +
      `<body><header>MY TEAM</header><section><div class="card"><h2>${employees[0].name}</h2>` +
      `<p>ID: 1</p><p>Role: ${employees[0].role}</p><p><a href="https://github.com/zerobitzz" target="_blank">Github: ${employees[0].github}</a></p>` +
      `<p><a href="mailto: ${employees[0].email}">Email: ${employees[0].email}</a></p></div></section></body></html>`

    expect(html).toEqual(expectedResult)
    console.log(`${html} to equal ${expectedResult}`)
  })

  it('should throw error when no name is provided', () => {
    // Arrange
    const employees = [{
      name: '',
      role: 'Engineer',
      email: 'zerothesu@gmail.com',
      github: 'zerobitzz',
    }]

    // Act/Assert
    expect(() => {
      createHtml(employees);
    }).toThrow();

  })
});

describe('create a HTML file', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call writeFileSync once', () => {
    // Arrange
    jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    // Act
    writeHtmlFile('test', 'test')
    // Assert
    expect(fs.writeFileSync).toHaveBeenCalledTimes(1)
  })

  it('should call writeFileSync with correct file name', () => {
    // Arrange
    jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    // Act
    writeHtmlFile('employees', 'html-template')
    // Assert
    expect(fs.writeFileSync).toHaveBeenCalledWith('employees.html', 'html-template')
  })
})