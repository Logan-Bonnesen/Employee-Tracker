const inquirer = require('inquirer');
const consoleTable = require('console.table');
// const db = require('./db/db.json');
const mysql = require('mysql2');
require('dotenv').config();

// Connecting to database
const connectToDb = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log('Now connected to employeeTracker_db')
);
connectToDb.connect(function (err){
    if(err) throw err

startPrompts();

});

function startPrompts() {
    inquirer.prompt(
        {
            type: "list", 
            name: "choice", 
            message: "What do you want to do?",
            choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Departments", "Add Department", "View All Roles", "Add Role", "Quit"]
        }
    ).then(function (data) {
        if (data.choice === "View All Employees") {
            viewAllEmployees();
        } else if (data.choice === "Add Employee") {
            addEmployees();
        } else if (data.choice === "Update Employee Role") {
            updateEmployeeRole();
        } else if (data.choice === "View All Departments") {
            viewAllDepartments();
        } else if (data.choice === "Add Department") {
            addDepartment();
        } else if (data.choice === "View All Roles") {
            viewAllRoles();
        } else if (data.choice === "Add Role") {
            addRole()
        } else if (data.choice === "Quit") {
            console.log("Leaving Application")
            connectToDb.end()
        }
    })
}
        
const viewAllEmployees = () => {
    connectToDb.query('SELECT * FROM employee', function (err, res) {
        if(err) throw err;
        console.table(res);
        startPrompts();
    })
}

const addEmployees = () => {
    connectToDb.query('SELECT * FROM role', function (err, res){
        if (err) throw err;
        inquirer.prompt([
            {
                name: "first_name",
                type: 'input',
                message: "What is the employee's first name?"
            },
            {
                name: "last_name",
                type: "input",
                message: "What is the employee's last name?"
            },
            {
                type: "list",
                name: "role_id",
                message: "Please select the role for new employee.",
                choices: res.map(role => role.title)
            },
            {
                name: "manager_name",
                type: "input",
                message: "Who is the manager of this employee?"
            }
        ]).then(function (data){
            const roleTitle = res.find(role => role.title === data.role_id)
            connectToDb.query('INSERT INTO employee SET ?', { 
                first_name: data.first_name,
                last_name: data.last_name,
                role_id: roleTitle.id
            },
            function (err, res) {if (err) throw err
            console.log("New Employee Added.");
            startPrompts();
            }
            )
        })
    })
}

const updateEmployeeRole = () => {
     connectToDb.query('SELECT * FROM employee',function (err, res){
         if(err) throw err
         inquirer.prompt([
             {
                 type: "list",
                 name: "employeeName", 
                 message: "Select employee to update role",
                 choices: res.map(employee => employee.first_name)
             }
         ]).then(function (data){
             const selectedEmployee = data.employeeName
            connectToDb.query('SELECT * FROM role', function (err, res){
                if(err) throw err
                inquirer.prompt([
                    {
                        type: "list",
                        name: "newRole_id",
                        message: "Please select the role for new employee.",
                        choices: res.map(role => role.title)
                    }
                ]).then(function (data){
                    const updatedRole = res.find(role => role.title === data.newRole_id)
                    connectToDb.query('UPDATE employee SET ? WHERE first_name =' + '"' + selectedEmployee + '"', {
                        role_id: updatedRole.id
                    }, function (err, res) {if (err) throw err
                    console.log('Employee Role Updated.')
                startPrompts()
            })
                })
            } )

         })
     } )
}

const viewAllDepartments = () => {
    connectToDb.query('SELECT * FROM department', function (err, res) {
        if(err) throw err;
        console.table(res);
        startPrompts();
    })
}

const addDepartment = () => {
    inquirer.prompt({
        type: "input",
        name: "dept",
        message: "Which department do you want to add?",

    
    }).then(function (data){
        
        connectToDb.query('INSERT INTO department SET ?', {
            name: data.dept
        },
        function (err, res) {if (err) throw err
        console.log("New Department Added")
        startPrompts()
    }
        )
})}

const viewAllRoles = () => {
    connectToDb.query('SELECT * FROM role', function (err, res) {
        if(err) throw err;
        console.table(res);
        startPrompts();
    })
}

const addRole = () => {
    inquirer.prompt({
        type: "input",
        name: "title",
        message: "Which role do you want to add?"

    
    },{
        type: "input", 
        name: "salary",
        message: "What is the salary of this new role?"
    
    }, {
        type: "list",
        name: "department_id", 
        message: "What is the department ID for this new role?",
        choices: ["1", "2", "3", "4"]

    }).then(function (data){
        
        connectToDb.query('INSERT INTO role SET ?', {
            title: data.title,
            salary: data.salary,
            department_id: data.department_id
        },
        function (err, res) {if (err) throw err
        console.log("New Role Added")
        startPrompts()
    }
        )
})}

// startPrompts();
// connectToDb();



