import { ConfType, readConfiguration } from "@/configUtil";
import { enchanceRead } from "@/enchanceUtil";
import {getCookie} from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  // check perms to avoid errors
  if (enchanceRead().setupYet != false) {
    // read config
    var config: ConfType = readConfiguration();
    // get token
    var session = req.cookies.loginToken
    if (session !== undefined) {
      // logged in
      config.userList?.forEach((ele) => {
        // find token
        if (ele.token == session) {
          res.send({ code: 200, data: ele.globalPermissions });
        }
      });
    } else {
      // not logged in
      res.status(400).send({code: 400, data: "Your unauthenticated"});
    }
  } else {
    // regular tamper 
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
