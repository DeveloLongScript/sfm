import authenticate from "@/authUtil";
import { enchanceRead } from "@/enchanceUtil";
import { NextApiRequest, NextApiResponse } from "next";
import * as path from "path";
import * as http from "http"
import * as fs from "fs";
import { readConfigFile } from "typescript";
import { readConfiguration } from "@/configUtil";

export default (req: NextApiRequest, res: NextApiResponse) => {
  authenticate(req, "W").then((result) => {
    if (enchanceRead().setupYet != false && result == true) {
      if (
        !fs.existsSync(
          path.join(
            <string>enchanceRead().storageLocation,
            req.headers["dir"] as string
          )
        ) ||
        fs
          .statSync(
            path.join(
              <string>enchanceRead().storageLocation,
              req.headers["dir"] as string
            )
          )
          .isFile() ||
        (req.headers["dir"] as string).includes("../") ||
        // Why is this here? I'm not taking any chances for someone to exploit out of the root folder.
        (req.headers["dir"] as string).includes("./")
      ) {
        res.status(400).send({ code: 400, message: "Header 'dir' is invalid" });
      } else {
        if (
          req.headers["name"] == undefined ||
          (req.headers["name"] as string).includes("../") ||
          // Why is this here? I'm not taking any chances for someone to exploit out of the root folder.
          (req.headers["name"] as string).includes("./") ||
          req.headers["url"] == undefined
        ) {
          res
            .status(400)
            .send({ code: 400, message: "Header 'name' is invalid" });
        } else {
          const file = fs.createWriteStream(path.join(readConfiguration().storageLocation, req.headers["dir"] as string, req.headers["name"] as string));
          const request = http.get(
            req.headers["url"] as string,
            function (response) {
              response.pipe(file);

              // after download completed close filestream
              file.on("finish", () => {
                file.close();
                res.send({code: 200, message: "Done!"})
              });
            }
          );
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
