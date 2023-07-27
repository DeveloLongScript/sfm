import authenticate from "@/authUtil";
import * as path from "path"
import * as fs from "fs"
import { enchanceRead } from "@/enchanceUtil";
import { NextApiRequest, NextApiResponse } from "next";
import { buildStaticPaths } from "next/dist/build/utils";
import { readConfiguration } from "@/configUtil";

export default (req: NextApiRequest, res: NextApiResponse) => {
  authenticate(req, "W").then((result) => {
    if (enchanceRead().setupYet != false && result == true) {
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
            res.status(400).send({
                code: 400,
                message: "Invalid header 'file'",
              });
          } else {

            var patha = req.headers["file"] as string
            fs.rmSync(path.join(readConfiguration().storageLocation, patha));
            res.send({
                code: 200,
                message: "Done."
            })
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
