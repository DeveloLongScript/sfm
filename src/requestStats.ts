import { readStatConfiguration, writeStatConfiguration } from "./configUtil";

// Give user stats on the dashboard etc.
export default function requestMiddleware() {
  // read stat config
  var config: StatConfig = readStatConfiguration();
  // pre-init var
  var dateExists = false;
  // again pre-init var
  var onWhich: {
    name: string;
    requests: number;
  } = { name: "00/00/00", requests: 0 };
  // same with this one
  var onWhichi: number = 0;

  if (config.apiUsage != null) {
    config.apiUsage.forEach((element, i) => {
      // getting current time
      var curTime =
        (new Date().getMonth() + 1).toString() +
        "/" +
        (new Date().getDate().toString() + "/") +
        new Date().getFullYear().toString();
      // does the date already exist?
      if (element.name == curTime) {
        dateExists = true;
        // saving element for later
        onWhich = element;
        onWhichi = i;
      }
    });
    if (dateExists) {
      // just add another request and finalize
      onWhich.requests++;
      config.apiUsage[onWhichi] = onWhich;
    } else {
      // create new date
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
    config.apiUsage = [{ name: curTime, requests: 1 }];
  }
  
  // finally write to file
  writeStatConfiguration(config);
}
export type StatConfig = {
  apiUsage: { name: string; requests: number }[];
};
