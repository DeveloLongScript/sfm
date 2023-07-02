import * as fs from "fs";
import * as path from "path";

export function removeLeadingDirectory(directoryPath: string): string {
  const directories = directoryPath.split("/");
  if (directories.length > 1) {
    const leadingDirectory = directories[directories.length - 2];
    return `/${leadingDirectory}`;
  }
  return directoryPath;
}

export function getDirectoriesRecursive(directoryPath: string): string[] {
  directoryPath = normalizeDirectoryPath(directoryPath);

  let directories: string[] = [];

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
export function normalizeDirectoryPath(directoryPath: string): string {
  return directoryPath.replace(/\\/g, "/");
}

export default {normalizeDirectoryPath, getDirectoriesRecursive, removeLeadingDirectory}