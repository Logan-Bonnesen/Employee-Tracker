const inquirer = require('inquirer');
const consoleTable = require('console.table');
const express = require('express');
// const db = require('./db/db.json');
const mysql = require('mysql2');
const { connect } = require('http2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connecting to database
const connectToDb = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'PassWord1',
        database: 'employeeTracker_db'
    },
    console.log('Now connected to employeeTracker_db')
);

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
        } else questionPrompts()
    })
}
        
const viewAllEmployees = () => {
    connectToDb.query()
}

const addEmployees = () => {
    connectToDb.query()
}

const updateEmployeeRole = () => {
    connectToDb.query()
}

const viewAllDepartments = () => {
    connectToDb.query()
}

const addDepartment = () => {
    inquirer.prompt({
        type: "list",
        name: "dept",
        message: "Which department do you want to add?",
        choices: ["Legal, Supply Chain, Customer Service"]
    
    }).then(function (data) {
        if(data.dept === "Legal") {
            deptLegal()
        } else if (data.dept === "Supply Chain"){
            deptSupplyChain()
        } else {
            deptCustomerService()
        }
    })
}

const viewAllRoles = () => {
    connectToDb.query()
}

const addRole = () => {
    connectToDb.query()
}

const deptLegal = () => {
    connectToDb.query()
}

const deptSupplyChain = () => {
    connectToDb.query()
}

const deptCustomerService = () => {
    connectToDb.query()
}



startPrompts();
connectToDb();



// app.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`)
// })