DROP DATABASE IF EXISTS etrack_db;

CREATE DATABASE etrack_db;

USE etrack_db;

CREATE TABLE departments (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  isDone VARCHAR(30) NOT NULL,
  userid DECIMAL NOT NULL,
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  FOREIGN KEY (role_id) REFERENCES roles(id) NOT NULL,
  FOREIGN KEY (manager_id) REFERENCES employees(id)
);