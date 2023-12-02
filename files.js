const fs = require("fs").promises;
const dataValidate = require("./helpers/datavalidator");
const path = require("path");
const chalk = require("chalk");
const checkExtension = require("./helpers/checkExtension");

const FOLDERPATH = path.join(__dirname, "./files");

const createFile = async (fileName, content) => {
  const file = {
    fileName,
    content,
  };

  const { error } = dataValidate(file);
  if (error) {
    console.log(
      chalk.red(`Please specify ${result.error.details[0].path[0]} parametr`)
    );
    return;
  }
  const { extension, result } = checkExtension(fileName);
  //   console.log(result.error.details[0]);
  if (!result) {
    console.log(
      chalk.red(`Sorry, this app doesn't support with ${extension} extension`)
    );
    return;
  }
  const filePath = path.join(__dirname, "./files", fileName);
  try {
    await fs.writeFile(filePath, content, "utf-8");
    console.log(chalk.green(`File is created successfully`));
  } catch (error) {
    console.log(error);
  }
};

const getFiles = async () => {
  try {
    const result = await fs.readdir(FOLDERPATH);
    if (result.length === 0) {
      console.log(chalk.red("Folder is empty"));
      return;
    }
    result.forEach((file) => console.log(file));
  } catch (error) {
  console.log(error)
}

 }

const getFileInfo = async (fileName) => { 

  const result = await fs.readdir(FOLDERPATH);
  if (!result.includes(fileName)) {
    console.log(chalk.red(`Folder does not contain ${fileName}`));
    return;
  }
  try {
    const filePath = path.join(FOLDERPATH, fileName);
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

    console.log(obj);
  } catch (error) {
    console.log(error);
  }
  
  
}
module.exports = { createFile, getFiles, getFileInfo };
