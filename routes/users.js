const express = require('express');
const router = express.Router();
const bcrypt=require('bcryptjs');
const Task_user=require('../db/User_task');



router.post('/signup',(req,res,next)=>{
    if(req.body.name.length<= 3){
        console.log("too short name");
        return res.status(406).json("Name too short ");}

        Task_user.findName(req.body,function (err,rows) {
if(err){ res.json(err);}
else{
    console.log(rows);
    if((rows.length>=2)&& (req.body.name===rows[0].name))
        return res.status(409).json("Name already exists");
    else {
        console.log("not find any reference for name");
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    error: err
                });
            } else {
                req.body.password = hash;
                Task_user.addTask(req.body, function (err, count) {
                    if (err) {
                        res.json(err);
                    }
                    else {
                        console.log("User created");
                        res.json(req.body);
                    }
                });
            }
            ;
        });
    }
}});
console.log("Otladka");

});

module.exports = router;