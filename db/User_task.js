var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "kk7va7uz",
    database:"trsis_lab1"
});

var Task_user={
    getAllTask:function (callback) {
        return con.query("SELECT * FROM Users",callback);
    },
    addTask:function (Task_user,callback) {
        return con.query("INSERT INTO Users(name,password) values(?,?)",[Task_user.name,Task_user.password],callback);
    },
    findName:function(Task_user,callback){
        return con.query("SELECT * FROM Users WHERE name = ?",Task_user.name,callback);
    },
    deleteTask:function (Task_user,callback) {
        return con.query("Delete from books WHERE id=?",[Task_user.id],callback)
    },
    updateTask:function (Task_user,callback) {
        return con.query("UPDATE books SET name=? where id=?",[Task_user.name,Task_user.id],callback);
    }
};
module.exports=Task_user;