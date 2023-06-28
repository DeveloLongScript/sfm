// DO NOT and I mean DO NOT EDIT OR DELETE THIS FILE!
// This file is used for editing the YAML file for the file struct.
// YOUR PULL REQUEST WILL GET REJECTED IF THIS FILE IS EDITED OR DELETED

const fs = require("fs");
const path = require("path");

export function removeLeadingDirectory(directoryPath) {
  const directories = directoryPath.split("/");
  if (directories.length > 1) {
    const leadingDirectory = directories[directories.length - 2];
    return `/${leadingDirectory}`;
  }
  return directoryPath;
}



function getDirectoriesRecursive(directoryPath) {
  directoryPath = normalizeDirectoryPath(directoryPath);

  let directories = [];

  const files = fs.readdirSync(directoryPath);
  for (const file of files) {
    const fullPath = path.join(directoryPath, file);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      directories.push(removeLeadingDirectory(fullPath.replace(/\\/g, "/")));
      const subDirectories = getDirectoriesRecursive(fullPath);
      directories = directories.concat(subDirectories);
    }
  }

  return directories;
}
function normalizeDirectoryPath(directoryPath) {
  return directoryPath.replace(/\\/g, "/");
}

module.exports = {
  normalizeDirectoryPath,
  getDirectoriesRecursive,
  removeLeadingDirectory,
};
