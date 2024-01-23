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


uploadRouter.post('/', upload.single('file'), async (req, res) => {
    const userId = req.body.user_id;
    const file = req.file;

    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        
        const fileStream = fs.createReadStream(file.path);
        const keyName = `${Date.now()}-${file.originalname}`;
        const uploadParams = {
            Bucket: "aws-s3-bucket24",
            Key: keyName,
            Body: fileStream,
            ACL: 'public-read' 
        };

        await s3Client.send(new PutObjectCommand(uploadParams));

        const fileUrl = `https://${uploadParams.Bucket}.s3.us-east-1.amazonaws.com/${keyName}`;
        const imageID = new mongoose.Types.ObjectId();
        const newImage = new imageDB({ _id:imageID, userid:
            userId, image_url: fileUrl, title: req.body.title, category:req.body.category,description:req.body.description,user_name:req.body.user_name });
        await newImage.save();

        res.status(200).json({ message: 'File uploaded successfully', url: fileUrl });
    } catch (error) {
        console.error('Error uploading file to S3:', error);
        res.status(500).send('Error uploading file');
    } finally {
        fs.unlinkSync(file.path); 
    }
});


module.exports = uploadRouter;