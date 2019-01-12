const express = require('express');
const router = express.Router();
const Task = require('../db/Books_task');
//import {Task} from "../db/conn";
const checkAuth = require('../middleware/check-auth');

router.get('/', (req, res, next) => {
    // console.log("***1*** Start GET items");
    Task.getAllTask(function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            return res.json(rows);
            //  return res.json({success:true,rows})
            //res.json(rows);
        }


    });
    /*console.log(Task.getAllTask());
    return  res.json(Task.getAllTask());
        console.log("***2*** Finish GET items");*/// mock data
});

router.post('/', checkAuth, (req, res, next) => {
    Task.addTask(req.body, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body);
        }
    });
});

router.post('/s', checkAuth, (req, res, next) => {

    Task.addTask(req.body.item, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body.item);
        }
    });
});

router.put('/', checkAuth, (req, res, next) => {
    console.log(req.body)


    Task.updateTask(req.body.item, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows)
        }
    });
});
router.delete('/', (req, res, next) => {
    console.log(req.body);

    Task.deleteTask(req.body, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});
module.exports = router;