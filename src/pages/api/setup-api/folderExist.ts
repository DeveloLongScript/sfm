import { NextApiRequest, NextApiResponse } from "next"
import { enchanceRead } from "@/enchanceUtil";
import { getDirectoriesRecursive } from "@/fileUtil";
import Cors from "cors"
import * as path from "path"
import * as fs from "fs"
import { runMiddleware } from "@/corsUtil";
import requestMiddleware from "@/requestStats";
import { ConfType, readConfiguration } from "@/configUtil";

export default (req: NextApiRequest, res: NextApiResponse) => {
    runMiddleware(req, res, Cors({
        methods: ['POST', 'GET', 'HEAD'],
      }))
    requestMiddleware();
    if (enchanceRead().setupYet == false) {
        if (req.headers["dir-exist"] != undefined) {
            res.send({
              code: 200,
              data: fs.existsSync( <string>req.headers["dir-exist"]),
            });
          } else {
            res.status(400).send({
              code: 400,
              message: "No 'dir-exist' header given.",
            });
          }
    } else {
        if (enchanceRead().storageLocation == "|||||||||tampered|||||||||") {
            res.status(500).send({code: 500, message: "It looks like the configuration file has been tampered with."})
        } else {
            res.status(500).send({code: 500, message: "SFM is already configured."})
        }
    }
}