import {gatherEmployeeInfo, createHtml, writeHtmlFile}  from './employeeGenerator.js'

gatherEmployeeInfo().then((employees) => {
  const html = createHtml(employees)
  writeHtmlFile('employees', html)
})