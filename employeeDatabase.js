const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'root',
  database: 'employees_db',
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`We're connected!`)
  runProgram();
});

const runProgram = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: `What would you like to do?`,
      choices: [
        `View/Add Departments`,
        `View/Add Roles`,
        `View/Add/Update Employees`,
        `Exit`
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View/Add Departments':
          //call view dept function
          break;
        case 'View/Add Roles':
          //call view roles function
          break;
        case 'View/Add/Update Employees':
          //call view employees function
          break;
        case 'Exit':
          connection.end();
          break;
      }
    });
};