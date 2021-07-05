const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table')

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
      name: 'action',
      type: 'list',
      message: 'Would you like to view or add departments?',
      choices: ['View Departments', 'Add a New Department', 'Main Menu']
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View Departments':
          viewDepartments();
          break;
        case 'Add a New Department':
          addRemoveDepartment();
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
      name: 'action',
      type: 'list',
      message: 'Would you like to view or add roles?',
      choices: ['View Roles', 'Add a New Role', 'Main Menu']
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View Roles':
          viewRoles();
          break;
        case 'Add a New Role':
          addRole();
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
      name: 'action',
      type: 'list',
      message: 'Would you like to view or add employees?',
      choices: ['View Employees', 'Add a New Employee', 'Main Menu']
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View Employees':
          viewEmployees();
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

const viewDepartments = () => {
  const query = 'SELECT * FROM department';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res)
    runProgram();
  });
};

const viewEmployees = () => {
  const query = 'SELECT * FROM employee';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log("This company has the following employees:")
    console.table(res)
    runProgram()
  });
};

const viewRoles = () => {
  const query = 'SELECT * FROM role';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log(`This company has the following roles:`);
    console.table(res);
    runProgram()
  });
};

const addRemoveDepartment = () => {
  inquirer
    .prompt({
      name: "addRemoveDepartment",
      type: 'list',
      message: 'Would you like to add or remove departments?',
      choices: ["Add", "Remove", "Back to main menu"]
    }).then((answer) => {
      switch (answer.addRemoveDepartment) {
        case "Add":
          addDepartment();
          break;
        //case "Remove":
        //removeDepartment();
        //break;
        case "Back to main menu":
          runProgram();
          break;
      }
    })
}

const addDepartment = () => {
  inquirer
    .prompt({
      name: 'newDepartment',
      type: 'input',
      message: 'What new department would you like to add?'
    }).then((answer) => {
      const query = `INSERT INTO department (name) VALUES ('${answer.newDepartment}')`;
      connection.query(query, (err, req) => {
        if (err) throw err;
        console.log(`Successfully added ${answer.newDepartment} to database!`);
        runProgram();
      })
    })
}
const addRole = () => {
  inquirer
    .prompt([
      {
        name: 'role',
        type: 'input',
        message: 'What role would you like to add?'
      },
      {
        name: 'salary',
        type: 'input',
        message: `What will the salary be for this role?`
      },
      {
        name: 'department',
        type: 'input',
        message: 'What is the ID of the department for which this role will funtion in'
      }
    ]).then((answers) => {
      const query = `INSERT INTO role (title, salary, department_id) VALUES ('${answers.role}', '${answers.salary}', '${answers.department}')`;
      connection.query(query, (err, req) => {
        if (err) throw err;
        console.log("Successfully added new role!")
      })
      runProgram();
    });
}