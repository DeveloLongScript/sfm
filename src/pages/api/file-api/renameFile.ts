import authenticate from "@/authUtil";
import { enchanceRead } from "@/enchanceUtil";
import * as fs from "fs";
import * as path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import { readConfiguration } from "@/configUtil";

export default (req: NextApiRequest, res: NextApiResponse) => {
  authenticate(req, "W").then((result) => {
    if (enchanceRead().setupYet != false && result == true) {
      if (
        req.headers["newname"] == undefined ||
        req.headers["file"] == undefined
      ) {
        res.status(400).send({ code: 400, message: "Invalid headers" });
      } else {
        if (
          !fs.existsSync(
            path.join(
              <string>enchanceRead().storageLocation,
              req.headers["file"] as string
            )
          ) ||
          fs
            .statSync(
              path.join(
                <string>enchanceRead().storageLocation,
                req.headers["file"] as string
              )
            )
            .isDirectory() ||
          (req.headers["file"] as string).includes("../") ||
          // Why is this here? I'm not taking any chances for someone to exploit out of the root folder.
          (req.headers["file"] as string).includes("./")
        ) {
          res.status(400).send({ code: 400, message: "Invalid header 'file'" });
        } else {
          if (
            (req.headers["newname"] as string).includes("../") ||
            // Why is this here? I'm not taking any chances for someone to exploit out of the root folder.
            (req.headers["newname"] as string).includes("./")
          ) {
            res
              .status(400)
              .send({ code: 400, message: "Invalid header 'newname'" });
          } else {
            fs.renameSync(
              path.join(
                readConfiguration().storageLocation,
                req.headers["file"] as string
              ),
              path.join(
                readConfiguration().storageLocation,
                req.headers["newname"] as string
              )
            );
            res.send({ code: 200, message: "Done!" });
          }
        }
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
