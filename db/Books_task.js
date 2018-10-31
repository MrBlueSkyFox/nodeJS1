var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "kk7va7uz",
    database:"trsis_lab1"
});

var Task_books={
    getAllTask:function (callback) {
        return con.query("SELECT * FROM books",callback);
    },
    addTask:function (Task,callback) {
        return con.query("INSERT INTO books(BookName) values(?)",[Task.BookName],callback);
    },
    deleteTask:function (Task,callback) {
        return con.query("Delete from books WHERE idbooks=?",[Task.idbooks],callback)
    },
    updateTask:function (Task,callback) {
        return con.query("UPDATE books SET BookName=? where idbooks=?",[Task.BookName,Task.idbooks],callback);
    }

};




module.exports=Task_books;
