require("dotenv").config();
const uploadRouter = require('express').Router()
const multer = require('multer');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const mongoose = require('mongoose');
const fs = require('fs');
const imageDB = require('../models/ImagesModel');

