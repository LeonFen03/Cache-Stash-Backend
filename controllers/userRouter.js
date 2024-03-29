require('dotenv').config()
const express = require('express')
const userRouter = express.Router();
const mongoose = require('mongoose');
const usersDB = require('../models/UserAuthenticationModel');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')

mongoose.connect(process.env.MONGO_URI);


userRouter.get('/', (req,res,next) => {
    usersDB.find().then((user) => {
        res.status(200).send(user);
    })
    .catch((err) => {
        console.log(err)
        res.status(404).send({ status:404, response:'Not found'});
    })
    
});

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

userRouter.delete('/:id', (req,res,next) => {
    const userID =  new mongoose.Types.ObjectId(req.params.id);
    usersDB.findByIdAndDelete(`${userID}`)
    .then(() => {
        res.redirect('/users');
    })
    .catch(() => {
        res.status(400).send({})
    })

})

userRouter.post('/', async (req,res,next) => {
    const {password, ...userData} = req.body;
    const id = new mongoose.Types.ObjectId();
    usersDB.create({
        _id: id,
        ...userData,
        role:'user',
        passwordDigest: await bcrypt.hash(password,10)
    }).then(() => {
        res.redirect('/users')
    })
    .catch((err) => {
      res.status(400).send({})
    })

})

module.exports = userRouter;