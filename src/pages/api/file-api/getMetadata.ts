import { enchanceRead } from "@/enchanceUtil";
import { NextApiRequest, NextApiResponse } from "next";
import * as path from "path";
import * as fs from "fs";
import { readConfiguration } from "@/configUtil";
import Cors from "cors";
import { runMiddleware } from "@/corsUtil";
import requestMiddleware from "@/requestStats";
import authenticate from "@/authUtil";

export default (req: NextApiRequest, res: NextApiResponse) => {
  runMiddleware(
    req,
    res,
    Cors({
      methods: ["POST", "GET", "HEAD"],
    })
  );
  requestMiddleware();
  authenticate(req, "R").then((result) => {
    if (enchanceRead().setupYet != false && result == true) {
      var rootPath = readConfiguration().storageLocation;
      if (req.headers["stat-file"] != undefined) {
        if (
          !fs.existsSync(
            path.join(rootPath, req.headers["stat-file"] as string)
          ) ||
          fs
            .statSync(path.join(rootPath, req.headers["stat-file"] as string))
            .isDirectory() ||
          (req.headers["stat-file"] as string).includes("../") ||
          // Why is this here? I'm not taking any chances for someone to exploit out of the root folder.
          (req.headers["stat-file"] as string).includes("./")
        ) {
          res.status(400).send({
            code: 400,
            message: "File doesn't exist.",
          });
        } else {
          res.send({
            code: 200,
            data: fs.statSync(
              path.join(rootPath, req.headers["stat-file"] as string)
            ),
          });
        }
      } else {
        res.status(400).send({
          code: 400,
          message: "No 'stat-file' header given.",
        });
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
