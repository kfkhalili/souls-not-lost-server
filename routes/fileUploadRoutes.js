"use strict";

const express = require("express");
const { upload } = require("../helpers/fileHelper");
const {
  singleFileUpload,
  getAllSingleFiles,
} = require("../controllers/fileUploaderController");
const router = express.Router();

router.post("/singleFile", upload.single("file"), singleFileUpload);
router.get("/getSingleFiles", getAllSingleFiles);

module.exports = {
  routes: router,
};
