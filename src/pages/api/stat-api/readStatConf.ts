import authenticate from "@/authUtil";
import { readStatConfiguration } from "@/configUtil";
import { runMiddleware } from "@/corsUtil";
import { enchanceRead } from "@/enchanceUtil";
import requestMiddleware from "@/requestStats";
import Cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  authenticate(req, "A").then((result) => {
    if (enchanceRead().setupYet != false && result == true) {
      runMiddleware(
        req,
        res,
        Cors({
          methods: ["POST", "GET", "HEAD"],
        })
      );
      requestMiddleware();
      res.send(readStatConfiguration());
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
