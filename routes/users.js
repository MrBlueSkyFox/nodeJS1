const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Task_user = require('../db/User_task');
const jwt = require("jsonwebtoken");


router.post('/signup', (req, res, next) => {
    if (req.body.name.length <= 3) {
        console.log("too short name");
        return res.status(406).json({name:"Name too Short"});
    }
    console.log(req.body);
    Task_user.findName(req.body, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            /*if((rows.length>=2)&& (req.body.name===rows[0].name))
                return res.status(409).json("Name already exists");*/
            if (rows !== '' && Object.keys(rows).length > 0) {
                if (req.body.name === rows[0].name) {
                    return res.status(409).json({name:"Name already exists"} );
                }
            } else {
                console.log("not find any reference for name");
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        let pas=req.body.password;
                        req.body.password = hash;
                        Task_user.addTask(req.body, pas,function (err, count) {
                            if (err) {
                                res.json(err);
                            } else {
                                console.log("User created");
                                res.json(req.body);
                            }
                        });
                    }
                    ;
                });
            }
        }
    });

});

router.post('/login', (req, res, next) => {
    console.log(req.body);


    if ((req.body.name === '') && (req.body.password === '')) {
        console.log("1 stop");
        return res.status(401).json({
                name: "Empty NAME or Password!",
                password:"Empty NAME or Password!"
        }
        );
    }


    Task_user.findName(req.body, function (err, rows) {
        if (err) {
            res.json(err);

        } else {

            if (rows !== '' && Object.keys(rows).length > 0) {
                console.log(rows);
                bcrypt.compare(req.body.password, rows[0].password, (err, result) => {
                    if (err) {
                        console.log("2 stop");
                        return res.status(401).json({
                            password:"Password! can't be compared"
                        }, err);
                    }
                    if (result) {
                        console.log("1.3AAAAAAAAA")
                        const token = jwt.sign(
                            {
                                name: rows[0].name,
                                userId: rows[0].id
                            },
                            process.env.JWT_KEY, {
                                expiresIn: "1h"
                            }
                        );
                        console.log("1.4AAAAAAAAA")
                        return res.status(200).json({
                            message: "Auth successful",
                            token: token
                        });
                    } else {
                        console.log("3 stop");
                        return res.status(401).json({
                            message: " Auth failed",
                            name:"Something semms not right!",
                            password:"unexpected error"
                        });
                    }
                });
            } else {
                console.log("4 stop");
                return res.status(401).json({
                    message: "Auth failed",
                    name:"Nit right",
                    password:"No work"
                });
            }
        }
    });

    // return res.status(401).json({message:"Auth failed"})
});
router.put('/', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({error: err})
        } else {
            const pas = req.body.password;
            console.log(pas);
            req.body.password = hash;
            console.log(req.body.password);
            Task_user.updateTask(req.body, pas, function (err, rows) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(rows);
                }
            })
        }
    })
});
module.exports = router;
