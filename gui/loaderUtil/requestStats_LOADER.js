const {readStatConfiguration, writeStatConfiguration} = require("./configUtil_LOADER")

function requestMiddleware() {
  var config = readStatConfiguration();
  var dateExists = false;
  var onWhich = { name: "00/00/00", requests: 0 };
  var onWhichi = 0;

  if (config.apiUsage != null) {
    config.apiUsage.forEach((element, i) => {
      var curTime =
        (new Date().getMonth() + 1).toString() +
        "/" +
        (new Date().getDate().toString() + "/") +
        new Date().getFullYear().toString();
      if (element.name == curTime) {
        dateExists = true;
        onWhich = element;
        onWhichi = i;
      }
    });
    if (dateExists) {
      onWhich.requests++;
      config.apiUsage[onWhichi] = onWhich;
    } else {
      var curTime =
      (new Date().getMonth() + 1).toString() +
        "/" +
        (new Date().getDate().toString() + "/") +
        new Date().getFullYear().toString();
      config.apiUsage.push({ name: curTime, requests: 1 });
    }
  } else {
    var curTime =
    (new Date().getMonth() + 1).toString() +
        "/" +
        (new Date().getDate().toString() + "/") +
        new Date().getFullYear().toString();
    config.apiUsage = [{name: curTime, requests: 1}]
  }

  writeStatConfiguration(config);
}

module.exports = {requestMiddleware}