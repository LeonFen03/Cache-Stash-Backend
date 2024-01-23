require('dotenv').config()
// Express and cor modules
const cors = require('cors')
const express = require('express');

// App instance of express module and json-web
const app = express();
const bodyParser = require('body-parser');

// Router Instances
const authenticationRouter = require('./controllers/authenticationRouter');
const userRouter = require('./controllers/userRouter');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Express middleware for requests
app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

// Future Routers for server
// app.use('/images', imageRouter)
// app.use('/upload',uploadRouter);
app.use('/users', userRouter)
app.use('/authentication', authenticationRouter);


app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`)
})