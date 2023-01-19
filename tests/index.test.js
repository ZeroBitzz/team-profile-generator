const inquirer = require('inquirer');
const fs = require('fs');

test('gatherInfo function works correctly', async () => {
  let employees = [];
  inquirer.prompt = jest.fn().mockResolvedValueOnce({
    name: 'Test Employee',
    role: 'Manager',
    email: 'test@email.com',
    officeNum: '1',
    more: false
  });
  await gatherInfo();

  expect(inquirer.prompt).toHaveBeenCalled();
  expect(employees).toEqual([{
    name: 'Test Employee',
    role: 'Manager',
    email: 'test@email.com',
    officeNum: '1'
  }]);

  const html = fs.writeFileSync.mock.calls[0][1];
  expect(html).toContain('Test Employee');
  expect(html).toContain('Role: Manager');
  expect(html).toContain('Office number: 1');
  expect(html).toContain('test@email.com');
});