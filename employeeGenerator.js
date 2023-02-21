import inquirer from 'inquirer'
import fs from 'fs'

// asynchronous function gatherInfo that asks the user questions about the employees and adds them and the corresponding information to the employees array
export async function gatherEmployeeInfo() {
  // array for employees and their information to display on page
  let employees = []
  let moreEmployees = true
  // while loop to get as many employees as needed

  while (moreEmployees) {
    const {name, role, school, email, github, officeNum, more} = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: "What is the employee's name?",
        default: "Broderick"
      },
      {
        type: 'list',
        name: 'role',
        message: "What is the employee's role?",
        choices: [
          'Manager', 'Engineer', 'Intern'
        ]
      },
      {
        type: 'input',
        name: 'school',
        message: "What school is the intern attending?",
        default: "University of Utah",
        when: (answers) => answers.role === "Intern"
      },
      {
        type: 'input',
        name: 'email',
        message: "What is the employee's email?",
        default: "zerothesu@gmail.com"
      },
      {
        type: 'input',
        name: 'github',
        message: "What is the employee's github?",
        default: "zerobitzz",
        when: (answers) => answers.role === "Engineer"
      },
      {
        type: 'input',
        name: 'officeNum',
        message: "What is the managers office number?",
        default: "5",
        when: (answers) => answers.role === "Manager"
      },
      {
        type: 'confirm',
        name: 'more',
        message: 'Do you have another employee to add?',
      }
    ])
    employees.push({name, role, school, email, github, officeNum})
    moreEmployees = more
  }
  console.log(employees)
  return employees;
}

export function createHtml(employees) {
  // creates html page for the information
  let html = `<html><head><link rel="stylesheet" href="./style.css"><title>Employees</title></head>`
  html += `<body><header>MY TEAM</header><section>`

  let employeeId = 1
  for (let employee of employees) {
    if(!employee.name || !employee.role || !employee.email) throw new Error('name, role, and email are required')
    // gets the role specific value of each employee to display on page
    let roleSpecificString
    if (employee.role === "Intern") {
      roleSpecificString = `School: ${employee.school}`
    } else if (employee.role === "Engineer") {
      roleSpecificString = `<a href="https://github.com/${employee.github}" target="_blank">Github: ${employee.github}</a>`
    } else {
      roleSpecificString = `Office number: ${employee.officeNum}`
    }
    // creates the html for page
    html += `<div class="card"><h2>${employee.name}</h2><p>ID: ${employeeId}</p><p>Role: ${employee.role}</p><p>${roleSpecificString}</p>`
    html += `<p><a href="mailto: ${employee.email}">Email: ${employee.email}</a></p></div>`

    employeeId++
  }
  html += `</section></body></html>`

  return html
}

export function writeHtmlFile(filename, html) {
  fs.writeFileSync(`${filename}.html`, html)
  console.log('Employee information gathered and HTML page created!')
}