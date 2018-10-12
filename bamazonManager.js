
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

var item = process.argv[2];
var quantity = process.argv[3];


connection.connect(function (err) {
    if (err) throw err;
    console.log("succesfully connected as id " + connection.threadId);
    afterConnection();
});


function afterConnection() {
    connection.query("SELECT 1 FROM products", function (err, res) {
        if (err) throw err;
        reports();
    });
}


function reports() {
    inquirer
        .prompt(
            {
                type: "list",
                message: "What report/activity would you like to run?",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
                name: "command"
            }
        )
        .then(function (inquirerResponse) {
            // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
            console.log("Your command was to " + inquirerResponse.command);
            decideWhatToDo(inquirerResponse.command);
        });
};


var decideWhatToDo = function (a) {
    if (a === "View Products for Sale") {
        viewProducts();
    }
    else if (a === "View Low Inventory") {
        viewInventory();
    }
    else if (a === "Add to Inventory") {
        addInventory();
    }
    else if (a === "Add New Product") {
        addProduct();
    }
}

var viewProducts = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("Here is all the inventory:");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);
          }
          console.log("-----------------------------------");
          reports();
    });
};

var viewInventory = function () {
    connection.query("SELECT * FROM products where stock_quantity < 5", function (err, res) {
        if (err) throw err;
        console.log("Here is all the inventory with less than 5 items in inventory:");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + "Quantity: " + " | " + res[i].stock_quantity);
          }
          console.log("-----------------------------------");
          reports();
    });
};

var addInventory = function () { 
    inquirer
    .prompt([
        {
            type: "input",
            message: "What item do you want to add more to inventory?",
            name: "item"
        },
        {
            type: "input",
            message: "How many do you want to add?",
            name: "quantity"
        }]
    )
    .then(function (inquirerResponse) {
        console.log("Your want to add " + inquirerResponse.quantity + " to item " + inquirerResponse.item);

        var sql = "select stock_quantity from products WHERE item_id =" + inquirerResponse.item;
        connection.query(sql, function (err, result) {
            if (err) throw err;
            // console.log(result);
            // console.log(result[0].stock_quantity);


        var sql = "UPDATE products SET stock_quantity =" + (result[0].stock_quantity + parseInt(inquirerResponse.quantity)) + " WHERE item_id =" + inquirerResponse.item;
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
            reports();
        });
        
    })})
    };
    

// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
