const fs = require("fs").promises;
const dataValidate = require("./helpers/datavalidator");
const path = require("path");
const chalk = require("chalk");
const checkExtension = require("./helpers/checkExtension");
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

module.exports = { createFile };
