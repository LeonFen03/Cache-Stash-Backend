require("dotenv").config();
const authenticationRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('json-web-token');
const userAuth = require('../models/UserAuthenticationModel');

authenticationRouter.post('/', async (req, res) => {
    
    let user = await userAuth.findOne({
        email: req.body.email 
    })

    if (!user || !await bcrypt.compare(req.body.password, user.passwordDigest)) {
        res.status(404).json({
        message: `Could not find a user with the provided username and password` 
      })
    } else {
        const result = await jwt.encode(process.env.JWT_SECRET, { id: user._id })           
        res.json({ user: user, token: result.value })           
    }
})

authenticationRouter.get('/profile', async (req, res) => {
    try {
        const [authenticationMethod, token] = req.headers.authorization.split(' ')
        if (authenticationMethod == 'Bearer') {

            const result = await jwt.decode(process.env.JWT_SECRET, token)

            const { id } = result.value

            let user = await userAuth.findOne({
                id:id
            })
            res.json(user)
        }
    } catch {
        res.json(null);
    }
})

module.exports = authenticationRouter;
