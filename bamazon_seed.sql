DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id VARCHAR(50) NOT NULL,
    product_name VARCHAR(1000) NOT NULL,
    department_name VARCHAR (50) NOT NULL,
    price DECIMAL(65,2) NULL,
    stock_quantity INT(255) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES
    (
        "1025","Etherenet Adapter Google Home Mini Micro-USB-RJ45 Wired LAN Network","Electronics",8.55,100
    ),
    (
        "2616","SAUDIO RGB Color Changing Bulbs, 4 Pack","Home Goods",39.99,2000
    ),
    (
        "5079","ALVANTE 2 Pcs Bicycle Quick-Release Alloy Fork Block Mount Car Rack","Automotive",54.99,1000
    ),
    (
        "4621","Learning React: Function Web Development with React and Redux 1st Edition","Books",28.95,10
    ),
    (
        "6688","Node.js, MongoDB, React, React Native Full-Stack Fundamentals and Beyond","Books",17.00,10
    ),
    (
        "1859","Philips Norelco S1560/81 Shaver","Health and Beauty",39.96,5
    ),
    (
        "0779","QCY T1 T1C True Wireless Earbuds","Electronics",21.79,5
    ),
    (
        "00122","VIVO Single Monitor Stand - Freestanding VESA Steel Mount Base Riser","Electronics",34.95,1
    ),
    (
        "87321","BOSTITCH RBK8 Rebuild Kit","Tools & Home Improvement",35.90, 15
    ),
    (
        "1112","BOSTITCH TVA11 Kit Trigger Valve","Tools & Home Improvement",35.95,10
    ),
    (
        "7442","Web Design with HTML, CSS, JavaScript and jQuery Set 1st Edition","Books",26.99,2
    ),
    (
        "0026","Microsoft Sculpt Ergonomic Keyboard for Business","Electronics",89.99,5
    );