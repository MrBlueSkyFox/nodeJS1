var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "kk7va7uz",
    database:"trsis_lab1"
});

var Task_books={
    getAllTask:function (callback) {
        console.log("***START getAllBooks");
        return con.query("SELECT * FROM books",callback);
    },
    addTaskS:function (Task,callback) {
        return con.query("INSERT INTO books(BookName) values(?)",[Task.BookName],callback);

    },
    addTask:function (Task,callback) {
        return con.query("INSERT INTO books(BookName,Price) values(?,?)",[Task.BookName,Task.Price],callback);

    },
    deleteTask:function (Task,callback) {
        return con.query("Delete from books WHERE idbooks=?",[Task.idbooks],callback)
    },
    updateTask:function (Task,callback) {
        return con.query(
            "UPDATE books SET BookName = ?, Price = ?  where idbooks=?",
            [Task.BookName,Task.Price,Task.idbooks],callback);
    }

};




module.exports=Task_books;
