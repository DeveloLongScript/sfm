var fs = require("fs");
var path = require("path");
var YAML = require("yaml");

var doNotEditComment =
  "# DO NOT EDIT/DELETE THIS FILE \n# this file is designed for the loader only \n# there is nothing interesting in here.\n";

function readConfiguration() {
  return YAML.parse(
    fs.readFileSync(path.join("./configuration/", "settings.yml"), "utf-8")
  );
}

function writeConfiguration(writtenText) {
  var write = YAML.stringify(writtenText);
  fs.writeFileSync(
    path.join("./public/", "loader.yml"),
    doNotEditComment + write
  );
}
function writeStatConfiguration(writtenText) {
  var write = YAML.stringify(writtenText);
  fs.writeFileSync(path.join("./configuration/", "stats.yml"), write);
}
function readStatConfiguration() {
  return YAML.parse(
    fs.readFileSync(path.join("./configuration/", "stats.yml"), "utf-8")
  );
}

module.exports = { readConfiguration, writeConfiguration, writeStatConfiguration, readStatConfiguration };
