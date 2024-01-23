require('dotenv').config()
const express = require('express')
const userRouter = express.Router();
const mongoose = require('mongoose');
const usersDB = require('../models/users');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')

mongoose.connect(process.env.MONGO_URI);

userRouter.get('/clear', (req,res,next) => {
    usersDB.deleteMany({})
    .then(() => {
        console.log('Successfully Deleted All users!');
        res.redirect('/users');
    })
    .catch((err) => {
        res.status(400).send({})
    })
});