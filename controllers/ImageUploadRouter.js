require("dotenv").config();
const uploadRouter = require('express').Router()
const multer = require('multer');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const mongoose = require('mongoose');
const fs = require('fs');
const imageDB = require('../models/ImagesModel');

const s3Client = new S3Client({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

const upload = multer({ dest: 'uploads/' });
