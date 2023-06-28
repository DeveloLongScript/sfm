import { ConfType, readConfiguration } from "@/configUtil";
import { enchanceRead } from "@/enchanceUtil";
import { NextApiRequest, NextApiResponse } from "next";
export default (req: NextApiRequest, res: NextApiResponse) => {
  if (enchanceRead().setupYet != false) {
    var config: ConfType = readConfiguration();
    var found = false;
    config.userList?.forEach((element) => {
      if (
        element.password == req.headers["password"] &&
        element.name == req.headers["username"]
      ) {
        res.setHeader(
          "Set-Cookie",
          `loginToken=${element.token}; HttpOnly; Secure`
        );
        found = true;
        res.send({
          code: 200,
          message: "Succesfully authenticated to " + element.name,
        });
      }
    });
    if (found === false) {
      res
        .status(400)
        .send({ code: 400, message: "Password or username incorrect." });
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
