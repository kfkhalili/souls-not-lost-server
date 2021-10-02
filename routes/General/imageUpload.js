const {uploadImageByFormaidable} = require("../../helpers/s3");
const router = require('express').Router();
const {v4: uuidv4} = require('uuid');
const fs = require("fs")
const ash = require("express-async-handler");
router.post("/image", ash(async (req, res) => {
        if (!req.files.image) {
            return res.status(400).send("image not found");
        }

        const bodyStream = fs.createReadStream(req.files.image.path);
        const fileName = req.files.image.name;
        const link = await uploadImageByFormaidable(bodyStream, `${uuidv4()}_${fileName}`);
        return res.json({
            uploaded: true,
            upload_message: "Image uploaded",
            link
        })
    }
))

module.exports = {
    routes: router
};