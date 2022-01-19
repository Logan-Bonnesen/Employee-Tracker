INSERT INTO department (name)
VALUES ('Sales'),
       ('Finance'),
       ('HR'),
       ('IT');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Rep', 60000, 1),
       ('Accountant', 80000, 2),
       ('HR Rep', 50000, 3),
       ('IT Manager', 75000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Lucy', 'Smith', 1, 4),
       ('Lola', 'Johnson', 2, 4),
       ('Jordan', 'Flynn', 3, 4),
       ('Jack', 'Hppkins', 4, NULL);