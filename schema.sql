DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title varchar(30),
    salary decimal,
    department_id int,
    CONSTRAINT FK_department FOREIGN KEY (department_id) REFERENCES department(id)

);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name varchar(30),
    last_name varchar(30),
    role_id int,
    CONSTRAINT FK_role FOREIGN KEY (role_id) REFERENCES role(id)
    manager_id int
    CONSTRAINT FK_manager FOREIGN KEY (manager_id) REFERENCES employee(id)
);