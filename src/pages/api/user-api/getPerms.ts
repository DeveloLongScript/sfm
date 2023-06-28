import { ConfType, readConfiguration } from "@/configUtil";
import { enchanceRead } from "@/enchanceUtil";
import {getCookie} from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next";
export default (req: NextApiRequest, res: NextApiResponse) => {
  if (enchanceRead().setupYet != false) {
    var config: ConfType = readConfiguration();
    var session = req.cookies.loginToken
    if (session !== undefined) {
      config.userList?.forEach((ele) => {
        if (ele.token == session) {
          res.send({ code: 200, data: ele.globalPermissions });
        }
      });
    } else {
      res.status(400).send({code: 400, data: "Your unauthenticated"});
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
    }
  }
};
