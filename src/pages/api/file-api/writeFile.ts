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
        req.headers["file"] !== undefined &&
        req.headers["write"] !== undefined
      ) {
        if (
          (req.headers["file"] as string).includes("../") ||
          (req.headers["file"] as string).includes("./") ||
          !fs.existsSync(
            path.join(
              readConfiguration().storageLocation,
              req.headers["file"] as string
            )
          )
        ) {
          res.status(400).send({ code: 400, message: "Invalid file" });
        } else {
          fs.writeFileSync(
            path.join(
              readConfiguration().storageLocation,
              <string>req.headers["file"]
            ),
            Buffer.from(<string>req.headers["write"], "base64").toString("ascii")
          );
          res.send({ code: 200, message: "Done." });
        }
      } else {
        res
          .status(400)
          .send({ code: 400, message: "File/write header doesn't exist" });
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
