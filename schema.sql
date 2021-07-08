DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY (id),
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Client Services");

INSERT INTO role (title, salary, department_id)
VALUES ("Account Coordinator", 40000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 100000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id )
VALUES ("Johnny", "Hope", 1, 1);

SELECT * FROM department;