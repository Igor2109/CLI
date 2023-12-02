const checkExtension = (fileName) => {
  const EXTENSIONS = ["txt", "js", "pdf", "ts", "doc"];
  const check = fileName.split(".");
  const lastEl = check[check.length - 1];
  const isIncludes = EXTENSIONS.includes(lastEl);
  return { extension: lastEl, result: isIncludes };
};

module.exports = checkExtension;
