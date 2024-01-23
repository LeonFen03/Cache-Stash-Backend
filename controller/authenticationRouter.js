require("dotenv").config();
const authenticationRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('json-web-token');
const userAuth = require('../models/UserAuthenticationModel');
