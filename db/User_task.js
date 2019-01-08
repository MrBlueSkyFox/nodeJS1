var mysql = require('mysql');
const DB=require('./user_mock')
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "kk7va7uz",
    database: "trsis_lab1"
});


var Task_user = {
    getAllTask: function (callback) {
        console.log(con.query("SELECT * FROM Users", callback));
        return con.query("SELECT * FROM Users", callback);
    },
    addTask: function (Task_user, pas,callback) {
        return con.query("INSERT INTO Users(name,password,_password) values(?,?,?)",
            [Task_user.name, Task_user.password,pas], callback);
    },
   /* findName: function (Task_user, callback) {
        return con.query("SELECT * FROM Users WHERE name = ?", Task_user.name, callback);
    },*/
     findName: function (Task_user, callback) {
        console.log(DB.find(DB.name===Task_user.name));
         return DB.find(DB.name===Task_user.name);
       return con.query("SELECT * FROM Users WHERE name = ?", Task_user.name, callback);
   },
    deleteTask: function (Task_user, callback) {
        return con.query("Delete from books WHERE id=?", [Task_user.id], callback)
    },
    updateTask: function (Task_user, pas, callback) {
        return con.query("UPDATE Users SET password=?,_password=? WHERE id=?", [Task_user.password, pas, Task_user.id], callback);
    }
};
module.exports = Task_user;