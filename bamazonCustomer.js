var mysql = require("mysql");
var inquirer = require("inquirer")
var available;
var allItems = [];

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon",
  });

initial();

//console log all of the items from the bamazon database
function initial() {
    connection.query(`SELECT * FROM products`, function (err, res) {
        if (err) throw (err);
        console.table(res);
        allItems = [];
        res.forEach(element => {
            allItems.push(element.item_id);
        });
        //calling the initial question
        questions()
    })
};

//asking the user what item they would like to purchase
function questions() {
    inquirer
    .prompt([
        {
        type: "input",
        name: "purchase",
        message: "What would you like to purchase?"
        }
    ])
    .then(function(user){
        //calling the inventory check function
        productCheck(user.purchase)
    })
}

//function to select the item from the database
function productCheck(x){
       if (allItems.includes(x, 0)){
           connection.query(`SELECT * FROM products WHERE item_id = "${x}"`, function (err, res){
                available = res[0];
                console.log(`this is the item you have selected`)
                console.table(available)
                //calling secondary line of questioning
                purchaseQuantity()
            });
        } else {
        console.error(`Item ID ${x} does not exist, please try another item`)
        initial();
        }
};

//asking the user the quantity they would like to purchase
function purchaseQuantity(){
    inquirer
    .prompt ([
        {
            type: "number",
            name: "purchaseQuantity",
            message: `You have selected item ID: ${available.item_id}. How many would you like to purchase?`
        }
    ])
    .then(function(user){
        console.log(`You have selected to purchase ${user.purchaseQuantity} of ${available.item_id}`)
        if (user.purchaseQuantity > available.stock_quantity) {
            console.log(`There are only ${available.stock_quantity} available of that item. Please choose again`)
            purchaseQuantity();
        }
        else {
            connection.query(`UPDATE products SET stock_quantity ="${available.stock_quantity - user.purchaseQuantity}" where item_id="${available.item_id}"`, function (err, res) {
                if (err) throw (err);
                else {
                    console.log('Your order was succesful!')
                }
            } 
            )
        }
    })
}
