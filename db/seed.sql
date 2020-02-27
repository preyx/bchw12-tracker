USE etrack_db;

INSERT INTO departments (id, name) VALUES
(1, 'Engineering'),
(2, 'Training'),
(3, 'Business Development'),
(4, 'Services'),
(5, 'Human Resources');

INSERT INTO roles (id, title, salary, department_id) VALUES
(1, 'Environmental Tech', 38298, 2),
(2, 'Systems Administrator I', 32098, 2),
(3, 'Account Executive', 40415, 5),
(4, 'Research Assistant III', 152580, 1),
(5, 'Developer IV', 205275, 2),
(6, 'Software Consultant', 36213, 1),
(7, 'Junior Executive', 110822, 1),
(8, 'Software Engineer III', 154582, 3),
(9, 'Computer Systems Analyst III', 191904, 4),
(10, 'Research Assistant III', 54723, 4);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id) VALUES
(1, 'Ynez', 'McDonand', 4, null),
(2, 'Arabel', 'Ripon', 10, null),
(3, 'Philip', 'Smythe', 9, null),
(4, 'Cassondra', 'Jeffers', 10, null),
(5, 'Ulick', 'Reddoch', 10, null),
(6, 'Odella', 'MacConnal', 5, 5),
(7, 'Amye', 'Pittock', 1, 3),
(8, 'El', 'Spieck', 9, null),
(9, 'Ramsay', 'Francioli', 10, null),
(10, 'Lianne', 'Shelmerdine', 7, 5),
(11, 'Shaw', 'Nend', 9, 1),
(12, 'Whitney', 'Ary', 2, 4),
(13, 'Rinaldo', 'Haverson', 4, 3),
(14, 'Adey', 'Jarmyn', 5, 2),
(15, 'Debbi', 'Slisby', 2, 3),
(16, 'Dare', 'Cudd', 8, 4),
(17, 'Arlen', 'Blakeley', 3, null),
(18, 'Bea', 'Seamans', 6, 5),
(19, 'Stephanie', 'Gaggen', 10, null),
(20, 'Faber', 'Flannigan', 1, 3);
