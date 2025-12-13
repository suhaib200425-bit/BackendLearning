const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "learning_mysql"
});



module.exports = db;