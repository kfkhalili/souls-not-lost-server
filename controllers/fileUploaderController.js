'use strict';
const SingleFile = require('../models/SingleFile');

const extractFileDetails = (file) => {
    console.log(file);
    return { 
        fileName: file.originalname, 
        filePath: file.path,
        fileType: file.mimetype,
        fileSize: fileSizeFormatter(file.size, 2) // 0.00
    }
}

const singleFileUpload = async (req, res, next) => {
    try{
        const file = new SingleFile(extractFileDetails(req.file));
        await file.save();
        res.status(201).send('File Uploaded Successfully');
    }catch(error) {
        res.status(400).send(error.message);
    }
}

const getAllSingleFiles = async (req, res, next) => {
    try{
        const files = await SingleFile.find();
        res.status(200).send(files);
    }catch(error) {
        res.status(400).send(error.message);
    }
}


const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}

module.exports = {
    singleFileUpload,
    getAllSingleFiles,
}