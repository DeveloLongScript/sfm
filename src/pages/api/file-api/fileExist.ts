import { NextApiRequest, NextApiResponse } from "next";
import { enchanceRead } from "@/enchanceUtil";
import * as fs from "fs";
import * as path from "path";
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
      if (req.headers["file-exist"] != undefined) {
        if (
          (req.headers["file-exist"] as string).includes("../") ||
          (req.headers["file-exist"] as string).includes("./")
        ) {
          res.status(400).send({
            code: 400,
            message: "Invalid header 'file-exist'",
          });
        } else {
          res.send({
            code: 200,
            data: fs.existsSync(
              path.join(
                <string>enchanceRead().storageLocation,
                req.headers["file-exist"] as string
              )
            ),
          });
        }
      } else {
        res.status(400).send({
          code: 400,
          message: "No 'file-exist' header given.",
        });
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
  });
};
