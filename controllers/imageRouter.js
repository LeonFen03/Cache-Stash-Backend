const express = require('express')
const imageRouter = express.Router();
const mongoose = require('mongoose');
const imageDB = require('../models/images');
const bodyParser = require('body-parser');
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");