import authenticate from "@/authUtil";
import { readConfiguration } from "@/configUtil";
import { enchanceRead } from "@/enchanceUtil";
import * as fs from "fs";
import { globSync } from "glob"; 
import { find } from "fs-jetpack";
import { NextApiRequest, NextApiResponse } from "next";
export default (req: NextApiRequest, res: NextApiResponse) => {
  authenticate(req, "R").then((result) => {
    if (enchanceRead().setupYet != false && result == true) {
        if (
            req.headers["pat"] == undefined ||
            (req.headers["pat"] as string).includes("../") ||
            // Why is this here? I'm not taking any chances for someone to exploit out of the root folder.
            (req.headers["pat"] as string).includes("./")
          ) {
            res.status(400).send({
                code: 400,
                message: "Invalid header 'file'",
              });
          } else {
            var search;
            if (req.headers["pat"].includes("*")) {
                search = globSync(req.headers["pat"], { cwd: readConfiguration().storageLocation})
            } else {
                search = globSync("**/*" + req.headers["pat"] + "*", { cwd: readConfiguration().storageLocation})
            }
            
            res.send({code: 200, data: search})
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
