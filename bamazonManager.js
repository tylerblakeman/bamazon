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
    })
    inquirer
    .prompt ([
        {
            type: "checkbox",
            name: "initialChoice",
            message: "Welcome to Bamazon Management dashboard, what would you like to do today?",
            choices: ""
        }
    ])
};

//asking the user what item they would like to purchase
function inventoryUpdate() {
    inquirer
    .prompt([
        {
        type: "input",
        name: "inventoryUpdate",
        message: "Please enter the item ID for the item you would like to update?"
        }
    ])
    .then(function(user){
        //calling the inventory check function
        productCheck(user.inventoryUpdate)
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
                updateQuantity()
            });
        } else {
        console.error(`Item ID ${x} does not exist, please try another item`)
        initial();
        }
};

//asking the user the quantity they would like add to the current inventory
function updateQuantity(){
    inquirer
    .prompt ([
        {
            type: "number",
            name: "updateeQuantity",
            message: `You have selected item ID: ${available.item_id}. How many would you like to purchase?`
        }
    ])
    .then(function(user){
        //asking the customer the amount that they would like to order of the specific item.
        console.log(`You have selected to purchase ${user.updateQuantity} of ${available.item_id}`)
        if (user.purchaseQuantity <= 0) {
            console.log(`You have chosen to add less than 0, please add 1 or more items to the inventory.`)
            purchaseQuantity();
        }
        else {
            //updating quantity to new quantity based on the customer's order
            connection.query(`UPDATE products SET stock_quantity ="${user.updateQuantity}" where item_id="${available.item_id}"`, function (err, res) {
                if (err) throw (err);
                else {
                    console.log('Your order was succesful!')
                    connection.end();
                }
            } 
            )
        }
    })
}
*