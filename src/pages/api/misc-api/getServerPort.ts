import { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";

export default (req: NextApiRequest, res: NextApiResponse) => {
  var portFile = fs.readFileSync("/gui/serverPort.txt", "utf-8");

  res.send({ code: 200, result: parseInt(portFile) });
};
