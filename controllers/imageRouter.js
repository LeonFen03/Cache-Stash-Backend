const express = require('express')
const imageRouter = express.Router();
const mongoose = require('mongoose');
const imageDB = require('../models/ImagesModel');
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
    region: process.env.AWS_REGION, 
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

async function deleteImageFromS3(bucketName, objectKey) {
    try {
        const deleteParams = {
            Bucket: bucketName,
            Key: objectKey
        };

        await s3Client.send(new DeleteObjectCommand(deleteParams));
        console.log(`File deleted successfully: ${objectKey}`);
    } catch (err) {
        console.error("Error", err);
        throw err;
    }
}