import authenticate from "@/authUtil";
import { enchanceRead } from "@/enchanceUtil";
import * as fs from "fs"
import YAML from "yaml"
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  authenticate(req, "T").then((result) => {
    if (enchanceRead().setupYet != false && result == true) {
        var token = makeToken(10)

        if (!fs.existsSync("configuration/terminal-tokens.yml")) {
            fs.openSync("configuration/terminal-tokens.yml", "w")
        }
        var validTokens: Array<string>;
        var config = YAML.parse(fs.readFileSync("configuration/terminal-tokens.yml", "utf-8"))
        if (config == null) {
            validTokens = [];
        } else {
            validTokens = config.validTokens
        }
        validTokens.push(token)
        config = {validTokens: validTokens}
        fs.writeFileSync("configuration/terminal-tokens.yml", YAML.stringify(config))
        res.send({code: 200, data: token})
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

/**
 * generators a user token
 * @param length how long the token is
 * @returns a random string
 */
function makeToken(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}