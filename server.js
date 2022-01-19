const inquirer = require('inquirer');
// const consoleTable = require('console.table');
// const express = require('express');
// const db = require('./db/db.json');

const PORT = process.env.PORT || 3001;
// const app = express();

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

function mainPrompts() {
    inquirer.prompt([
        {
            type: "list",
            name: "choices",
            message: "What do you want to do?",
            choices: [
                {
                    name: "View All Employees", 
                    value: "View_Employees"
                },
                {
                    name: "Add Employee", 
                    value: "Add_Employee"
                },
                {
                    name: "Update Employee Role", 
                    value: "Update_Employee_Role"
                },
                {
                    name: "View All Roles",
                    value: "View_All"
                },
                {
                    name: "Add Role",
                    value: "Add_Role"
                },
                {
                    name: "View All Departments",
                    value: "View_All_Departments"
                },
                {
                    name: "Add Department", 
                    value: "Add_Department"
                }
            ]

        }
    ])
}


mainPrompts();




app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})