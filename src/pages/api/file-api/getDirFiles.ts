import { ConfType, readConfiguration } from "@/configUtil";
import { enchanceRead } from "@/enchanceUtil";
import * as fs from "fs";
import * as path from "path";
import { getDirectoriesRecursive } from "@/fileUtil";
import { NextApiRequest, NextApiResponse } from "next";
import { runMiddleware } from "@/corsUtil";
import Cors from "cors";
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
      if (req.headers["from-dir"] != undefined) {
        if (fs.existsSync(path.join(<string>(readConfiguration() as ConfType).storageLocation, <string>req.headers["from-dir"]))) {
          const filesInDir = fs.readdirSync(
            path.join(
              <string>enchanceRead().storageLocation,
              req.headers["from-dir"] as string
            )
          );
          const formattedFiles: Array<{ type: string; name: string }> = [];
          for (const file in filesInDir) {
            if (
              fs
                .statSync(
                  path.join(
                    path.join(
                      <string>enchanceRead().storageLocation,
                      req.headers["from-dir"] as string
                    ),
                    filesInDir[file]
                  )
                )
                .isDirectory()
            ) {
              formattedFiles.push({ type: "folder", name: filesInDir[file] });
            } else {
              formattedFiles.push({ type: "file", name: filesInDir[file] });
            }
          }
          res.send({ code: 200, data: formattedFiles });
        } else {
          res.status(400).send({
            code: 400,
            message:
              "Cannot find directory.",
          });
        }
      } else {
        res
          .status(400)
          .send({ code: 400, message: "No 'from-dir' header given." });
      }
    } else {
      if (enchanceRead().storageLocation == "|||||||||tampered|||||||||") {
        res
          .status(500)
          .send({
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
  })
  
};
