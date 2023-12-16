const fs = require("fs").promises;
const dataValidate = require("./helpers/datavalidator");
const path = require("path");
const checkExtension = require("./helpers/checkExtension");

const FOLDERPATH = path.join(__dirname, "./files");

const createFile = async (req, res) => {
  const { fileName, content } = req.body;


  const { error } = dataValidate(req.body);
  if (error) {
    res.status(400).json({
      message: `Please specify ${error.details[0].path[0]} parametr`,
    });
    return;
  }
  const { extension, result } = checkExtension(fileName);

  if (!result) {
    res.status(400).json({
      message: `Sorry, this app doesn't support with ${extension} extension`,
    });
    return;
  }
  const filePath = path.join(__dirname, "./files", fileName);
  try {
    await fs.writeFile(filePath, content, "utf-8");
    res.status(201).json({ message: `File is created successfully` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getFiles = async (req, res) => {
  try {
    const result = await fs.readdir(FOLDERPATH);
    if (result.length === 0) {
      res.status(404).json({ message: "Folder is empty" });
      return;
    }
   res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getFileInfo = async (req, res) => {
  const {filename} = req.params
  const result = await fs.readdir(FOLDERPATH);
  if (!result.includes(filename)) {
    res.status(400).json({ message: `Folder does not contain ${filename}` });
    return;
  }
  try {
    const filePath = path.join(FOLDERPATH, filename);
    const fileContent = await fs.readFile(filePath, "utf-8");
    const { birthtime: createdAt } = await fs.stat(filePath);
    const extension = path.extname(filePath);
    const nameFile = path.basename(filePath, extension);

    const obj = {
      fileContent,
      createdAt,
      extension,
      nameFile,
    };

    res.json(obj);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Server error` });
  }
};
module.exports = { createFile, getFiles, getFileInfo };
