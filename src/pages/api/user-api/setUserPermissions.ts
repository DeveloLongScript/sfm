import authenticate from "@/authUtil";
import { ConfType, readConfiguration, writeConfiguration } from "@/configUtil";
import { enchanceRead } from "@/enchanceUtil";
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  // right perms and if setup yet
  authenticate(req, "A").then((result) => {
  if (enchanceRead().setupYet != false && result == true) {
    if (
      req.headers["username"] == undefined ||
      req.headers["permissions"] == undefined
    ) {
      res
        .status(400)
        .send({
          code: 400,
          message: "You need both a permissions and a name header.",
        });
    } else {
      // read config
      var config: ConfType = readConfiguration();
      var whatElement: {
        name: string;
        globalPermissions: string;
      }|null = null;
      var whatElementI: number = 0;

      config.userList?.forEach((element, i) => {
        if (element.name == req.headers["username"]) {
          element.globalPermissions = <string>req.headers["permission"]
          whatElement = element;
          whatElementI = i;
        }
      });
      if (whatElement == null) {
        res.status(400).send({code: 400, message: "No user found."})
      } else {
        if (config.userList != undefined) {
            config.userList[whatElementI] = whatElement;
            res.send({code: 200, message: "Succesfully changed user permissions."})
        } else {
            res.status(400).send({code: 400, message: "No user list."})
        }
      }
      
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
  }})
};
