-- drop database if exists bamazon;
-- create database bamazon;

use bamazon;

create table products(
    item_id int not null auto_increment, 
    product_name varchar(100) not null, 
    department_name varchar(100) not null, 
    price decimal (10,4) not null, 
    stock_quantity int not null,
    PRIMARY KEY (item_id)
);

 INSERT INTO products (product_name, department_name, price, stock_quantity)
 VALUES ("Malokin Brittle", "Gourmet Foods", 7.99, 100), 
        ("Malokin Treats - Cinnamon", "Gourmet Foods", 8.99, 100),
        ("Malokin Treats - Original", "Gourmet Foods", 7.99, 100),
        ("Fitbit Watch", "Electronics", 199.99, 2000),
        ("Kickboard", "Toys", 150, 200),
        ("Table", "Furniture", 499, 10),
        ("Refrigerator", "Appliances", 999, 80),
        ("Pretzels", "Foods", 3.99, 1000),
        ("Rubber Bands", "Office Supplies", 0.99, 700),
        ("Bandaids", "Medical Supplies", 4.99, 4500),
        ("Tooth Paste", "Personal Care Products", 2.99, 400),
        ("Floss", "Personal Care Products", 1.99, 500);

