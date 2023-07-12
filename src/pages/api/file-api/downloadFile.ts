import { NextApiRequest, NextApiResponse } from "next";
import * as path from "path";
import * as fs from "fs";
import * as mime from "mime";
import { enchanceRead } from "@/enchanceUtil";
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
    if (
      enchanceRead().setupYet != false &&
      result == true
    ) {
      if (req.headers["file"] != undefined) {
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
            message: "File doesn't exist.",
          });
        } else {
          res.setHeader(
            "Content-Type",
            <string>mime.getType(req.headers["file"] as string)
          );
          res.send(
            fs.readFileSync(
              path.join(
                <string>enchanceRead().storageLocation,
                req.headers["file"] as string
              ),
              "utf-8"
            )
          );
        }
      } else {
        res.status(400).send({
          code: 400,
          message: "No 'file' header given.",
        });
      }
    } else {
      if (enchanceRead().storageLocation == "|||||||||tampered|||||||||") {
        res.status(500).send({
          code: 500,
          message: "It looks like the configuration file has been tampered with.",
        });
      } else {
        res
          .status(500)
          .send({ code: 500, message: "SFM hasn't been configured yet." });
      }}
  })
};
