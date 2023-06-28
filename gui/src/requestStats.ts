import {
  readStatConfiguration,
  writeStatConfiguration,
} from "./configUtil";


export default function requestMiddleware() {
  var config: StatConfig = readStatConfiguration();
  var dateExists = false;
  var onWhich: {
    name: string;
    requests: number;
  } = { name: "00/00/00", requests: 0 };
  var onWhichi: number = 0;

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
export type StatConfig = {
  apiUsage: { name: string; requests: number }[];
};
