const gatherInfo = require('../index.js')
const inquirer = require('inquirer')
const fs = require('fs')

jest.mock('inquirer')
jest.mock('fs')

beforeEach(() => {
  jest.resetAllMocks()
})

test('gatherInfo should gather employee information and create an HTML page', async () => {
    inquirer.pro1mpt.mockResolvedValueOnce({
        name: 'John Doe',
        role: 'Manager',
        officeNum: '5',
        email: 'johndoe@email.com',
        more: true,
    }).mockResolvedValueOnce({
        name: 'Jane Smith',
        role: 'Intern',
        school: 'University of Utah',
        email: 'janesmith@email.com',
        more: false,
    })
    // fs.writeFileSync.mockReturnValue(undefined)

    await gatherInfo()

    // expect(inquirer.prompt).toHaveBeenCalledTimes(2)
    // expect(fs.writeFileSync).toHaveBeenCalledWith('employees.html', expect.stringContaining('John Doe'))
    // expect(fs.writeFileSync).toHaveBeenCalledWith('employees.html', expect.stringContaining('Jane Smith'))
    // expect(console.log).toHaveBeenCalledWith('Employee information gathered and HTML page created!')
})
