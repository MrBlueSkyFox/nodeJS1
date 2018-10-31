var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "kk7va7uz",
    database:"trsis_lab1"
});

con.connect(function(err) {
    if (err) throw err;
    var sql = "CREATE TABLE Users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255),password)";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});