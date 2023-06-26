-- Create database in ElephantSQL
DATABASE name bepijar

-- Create table 

CREATE TABLE category(
    id VARCHAR PRIMARY KEY,
    name VARCHAR (255) NOT NULL,
    photo VARCHAR NOT NULL
);

INSERT INTO category(id, name, photo) 
VALUES (1, 'Outfit', 'catimg1.jpg'),
(2, 'Footwear', 'catimg2.jpg');

CREATE TABLE product(
    id VARCHAR PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    stock INT NOT NULL,
    price INT NOT NULL,
    photo VARCHAR NOT NULL,
    rate INT NOT NULL,
    brand VARCHAR(255) NOT NULL,
    id_category VARCHAR 
);

INSERT INTO product(id, name, stock, price, photo, rate, brand, id_category) 
VALUES (1, 'Corporate White Shirt', 20, 110000, 'img1.jpg', 4, 'Alisan', 1),
(2, 'Polo Shirt', 40, 90000, 'img2.jpg', 5, 'Ralph Lauren', 1),
(3, 'Varsity Jacket', 20, 150000, 'img3.jpg', 4, 'Erigo', 1),
(4, 'Nike Dunk Low', 15, 550000, 'img4.jpg', 4, 'Nike', 2),
(5, 'Yeezy slide', 45, 330000, 'img5.jpg', 5, 'Adidas', 2);

CREATE TABLE users(
    id VARCHAR PRIMARY KEY,
    name VARCHAR (255) NOT NULL,
    email VARCHAR (255) NOT NULL,
    password VARCHAR (255) NOT NULL,
    phone_number VARCHAR (255) NOT NULL,
    gender VARCHAR (255) NOT NULL,
    birth_date DATE NOT NULL,
    role VARCHAR(255) NOT NULL
);

INSERT INTO users(id, name, email, password, phone_number, gender, birth_date, role)
VALUES ()
user=
    "email" : "Sasha@gmail.com",
    "password" : "pass456"

CREATE TABLE transaction(
    id VARCHAR PRIMARY KEY,
    payment_method VARCHAR (255) NOT NULL,
    users_email VARCHAR NOT NULL,
    id_product VARCHAR NOT NULL,
    transaction_date DATE NOT NULL
);

INSERT INTO transaction(id, payment_method, users_email, id_product, transaction_date) 
VALUES (1, 'Mastercard', Sasha@gmail.com, 3, '2023-06-19'),
(2, 'Gopay', Sandro@gmail.com, 5, '2023-06-20');

SELECT transaction.*, users.name AS buyer_name, users.phone_number, product.name, product.price FROM transaction INNER JOIN users ON transaction.users_email = users.email INNER JOIN product ON transaction.id_product = product.id;