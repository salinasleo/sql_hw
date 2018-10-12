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
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("Here is all the inventory:");
        console.log(res);
        cashier();
    });
}

function cashier() {
    inquirer
        .prompt([

            {
                type: "input",
                message: "What is the id of the item you want to buy?",
                name: "item"
            },

            {
                type: "input",
                message: "how many units of that item do you want to buy?",
                name: "quantity"
            }
        ])
        .then(function (inquirerResponse) {
            console.log("Your want to buy " + inquirerResponse.quantity + " of item " + inquirerResponse.item);
            connection.query("SELECT * FROM products WHERE ?",
                { item_id: inquirerResponse.item }
                ,
                function (error, results) {
                    if (error) throw err;
                    console.log(results);
                    console.log("There are these " + results[0].stock_quantity + " of item " + results[0].product_name + " (item id " + results[0].item_id + ")");
                    checkinventory(results[0].item_id, results[0].stock_quantity, inquirerResponse.quantity, results[0].price);
                }
            )
        });
};

var checkinventory = function (a, b, c, d) {
    if (b < c) console.log("There is not enough stock in inventory to fill this order");
    else {
        var sql = "UPDATE products SET stock_quantity =" + (b - c) + " WHERE item_id =" + a;
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
            ringTotal(c, d);
        });
    }
};

var ringTotal = function (quantity, price) {
    console.log("Your Total is: $" + (quantity * price));
};


