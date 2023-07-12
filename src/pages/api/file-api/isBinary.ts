import authenticate from "@/authUtil";
import { enchanceRead } from "@/enchanceUtil";
import * as path from "path";
import * as fs from "fs"
import { NextApiRequest, NextApiResponse } from "next";
import { isBinary } from "istextorbinary";
import { readConfiguration } from "@/configUtil";

export default (req: NextApiRequest, res: NextApiResponse) => {
  authenticate(req, "R").then((result) => {
    if (enchanceRead().setupYet != false && result == true) {
      if (req.headers["file"] != undefined) {
        var name = path.join(
          readConfiguration().storageLocation,
          req.headers["file"] as string
        );
        var fileNameIndex = name.lastIndexOf("/") + 1;
        var filename = name.substr(fileNameIndex);
        res.send({ code: 200, result: isBinary(filename, fs.readFileSync(name)) });
      }
    } else {
      if (enchanceRead().storageLocation == "|||||||||tampered|||||||||") {
        res.status(500).send({
          code: 500,
          message:
            "It looks like the configuration file has been tampered with.",
        });
      } else {
        res
          .status(500)
          .send({ code: 500, message: "SFM hasn't been configured yet." });
      }
    }
  });
};
