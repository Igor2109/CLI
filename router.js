const express = require("express");
const { createFile, getFiles, getFileInfo } = require("./files");

const router = express.Router()

router.post("/", createFile);

router.get("/", getFiles);

router.get("/:filename", getFileInfo);

module.exports = router;

