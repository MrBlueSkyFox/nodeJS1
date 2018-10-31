const express = require('express');
const router = express.Router();
const Task=require('../db/Books_task');
//import {Task} from "../db/conn";

router.get('/',(req,res,next)=>{
    Task.getAllTask(function (err,rows) {
        if(err){ res.json(err);}
        else{ res.json(rows);}

    });

});

router.post('/',(req,res,next)=>{
    Task.addTask(req.body,function (err,count) {
        if(err){res.json(err);}
        else{ res.json(req.body);}
    });
});

router.put('/',(req,res,next)=>{
    Task.updateTask(req.body,function (err,rows) {
        if(err){res.json(err);}
        else{res.json(rows);}
    });
});
router.delete('/',(req,res,next)=>{
    Task.deleteTask(req.body,function (err,rows) {
        if(err){res.json(err);}
        else{ res.json(rows);}
    });
});
module.exports = router;