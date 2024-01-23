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

imageRouter.post('/', (req,res,next) => {
    imageDB.find({user_id: req.body.user_id}).then((images) => {
        res.status(200).send(images);
    })
    .catch((err) => {
        console.log(err)
        res.status(404).send({ status:404, response:'Not found'});
    })
    
});

imageRouter.get('/clear', (req,res,next) => {
    imageDB.deleteMany({})
    .then(() => {
        console.log('Successfully Deleted All Images');
        res.redirect('/images');
    })
    .catch((err) => {
        res.status(400).send({})
    })
});

imageRouter.delete('/:id', (req,res,next) => {

    const imageID =  new mongoose.Types.ObjectId(req.params.id);
    imageDB.findByIdAndDelete(`${imageID}`)
    .then((image) => {
        console.log(user);
        deleteImageFromS3("aws-s3-bucket24", image.image_url)
        .then(() => console.log('Image deleted successfully'))
        .catch(err => console.error('Error deleting image', err));
        imageDB.find({user_id: image.user_id}).then((images) => {
            res.status(200).send(images);
        })
        .catch((error) => {
            console.log(error);
        })
        
    })
    .catch((error) => {
        console.log(error)
    })

})