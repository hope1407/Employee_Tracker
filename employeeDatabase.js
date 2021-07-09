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

//Database connection
connection.connect((err) => {
  if (err) throw err;
  console.log(`We're connected!`)
  runProgram();
});
//Init program
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
//Questions and actions regarding departments
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
          addDepartment();
          break;
        case 'Main Menu':
          runProgram();
          break;
      };
    });
};
//to view departments in company
const viewDepartments = () => {
  const query = 'SELECT * FROM department';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res)
    runProgram();
  });
};
//to add departments to company
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
//Questions and actions regarding roles
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
//to view roles in company
const viewRoles = () => {
  const query = 'SELECT * FROM role';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log(`This company has the following roles:`);
    console.table(res);
    runProgram()
  });
};
//to add roles to company
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
//Questions and actions regarding employees
const employees = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'Would you like to view or add employees?',
      choices: ['View Employees', 'Add a New Employee', 'Update a Role', 'Main Menu']
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View Employees':
          viewEmployees();
          break;
        case 'Add a New Employee':
          addEmployees();
          break;
        case 'Update a Role':
          updateRole();
          break;
        case 'Main Menu':
          runProgram();
          break;
      };
    });
};
//to view employees in company
const viewEmployees = () => {
  const query = 'SELECT * FROM employee';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log("This company has the following employees:")
    console.table(res)
    runProgram()
  });
};
//to add employees to company
const addEmployees = () => {
  inquirer
    .prompt([
      {
        name: 'firstName',
        type: 'input',
        message: 'What is the first name of the employee?'
      },
      {
        name: 'lastName',
        type: 'input',
        message: 'What is the last name of the employee?',
      },
      {
        name: 'roleId',
        type: 'input',
        message: 'What is the ID of the role for which the employee will play?',
      },
      {
        name: 'managerId',
        type: 'input',
        message: 'What is the ID of the manager for which the employee will report to?',
      },
    ]).then((answers) => {
      const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.firstName}','${answers.lastName}', '${answers.roleId}','${answers.managerId}')`;
      connection.query(query, (err, req) => {
        if (err) throw err;
        console.log('Successfully added new employee!')
      })
      runProgram();
    });
}

const updateRole = () => {
  const query = `SELECT * FROM employee`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: 'choice',
          type: 'rawlist',
          choices() {
            const choiceArray = [];
            res.forEach(({ first_name }) => {
              choiceArray.push(first_name);
            });
            return choiceArray;
          },
          message: `Which employee's role would you like to update?`,
        },
        {
          name: 'newRole',
          type: 'input',
          message: `What is the ID for the employee's new role?`,
        }
      ])
      .then((answers) => {
        let chosenEmployee;
        res.forEach((employee) => {
          if (employee.first_name === answers.choice) {
            chosenEmployee = employee;
          }
        });
        connection.query(
          `UPDATE employee SET ? WHERE ?`,
          [
            {
              role_id: answers.newRole,
            },
            {
              first_name: chosenEmployee.first_name
            },
          ],
          (err) => {
            if (err) throw err;
            console.log('Employee role updated!');
            runProgram();
          }
        )
      })
  })
}