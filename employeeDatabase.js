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
          departments()
          break;
        case 'View/Add Roles':
          roles();
          break;
        case 'View/Add/Update Employees':
          employees();
          break;
        case 'Exit':
          connection.end();
          break;
      }
    });
};

const departments = () => {
  inquirer
    .prompt({
      name : 'action',
      type : 'list',
      message : 'Would you like to view or add departments?',
      choices : ['View Departments', 'Add a New Department', 'Main Menu']
    })
    .then((answer) => {
      switch (answer.action){
        case 'View Departments':
          //viewDepartments function;
          break;
        case 'Add a New Department':
          //addDepartment function;
          break;
        case 'Main Menu':
          runProgram();
          break;
      };
    });
};

const roles = () => {
  inquirer
    .prompt({
      name : 'action',
      type : 'list',
      message : 'Would you like to view or add roles?',
      choices : ['View Roles', 'Add a New Role', 'Main Menu']
    })
    .then((answer) => {
      switch (answer.action){
        case 'View Roles':
          //viewRoles function;
          break;
        case 'Add a New Role':
          //addRole function;
          break;
        case 'Main Menu':
          runProgram();
          break;
      };
    });
};

const employees = () => {
  inquirer
    .prompt({
      name : 'action',
      type : 'list',
      message : 'Would you like to view or add employees?',
      choices : ['View Employees', 'Add a New Employee', 'Main Menu']
    })
    .then((answer) => {
      switch (answer.action){
        case 'View Employees':
          //viewEmployees function;
          break;
        case 'Add a New Employee':
          //addEmployees function;
          break;
        case 'Main Menu':
          runProgram();
          break;
      };
    });
};