import authenticate from "@/authUtil";
import { runMiddleware } from "@/corsUtil";
import { enchanceRead } from "@/enchanceUtil";
import requestMiddleware from "@/requestStats";
import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { ConfType, readConfiguration } from "@/configUtil";
// geticonfromfilename
export default (res: NextApiResponse, req: NextApiRequest) => {
  runMiddleware(
    req,
    res,
    Cors({
      methods: ["POST", "GET", "HEAD"],
    })
  );
  requestMiddleware();
  if (enchanceRead().setupYet != false && authenticate(req, "R")) {
    if (req.headers.filename != undefined) {
      var config: ConfType = readConfiguration()
      if (req.headers.specialIconPack == undefined) {
        config.iconPackDatabase?.forEach((ele) => {
          if (ele.default == true) {
            
          }
        })
      }
      
    } else {
      res.send({code: 400, message: "No filename header given."})
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
};
