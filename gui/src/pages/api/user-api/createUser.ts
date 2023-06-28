import authenticate from "@/authUtil";
import { ConfType, readConfiguration, writeConfiguration } from "@/configUtil";
import { enchanceRead } from "@/enchanceUtil";
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (enchanceRead().setupYet != false && authenticate(req, "A")) {
        if (req.headers["username"] == undefined || req.headers["permissions"] == undefined || req.headers["password"] == undefined) {
            res.status(400).send({code: 400, message: "You need password, username to continue"})
        } else {
            var config: ConfType = readConfiguration()
            var token = makeToken(8)
            config.userList?.forEach((ele) => {
                if (ele.token == token) {
                    token = makeToken(8)
                }
            })
            

            config.userList?.push({name: <string>req.headers["username"], globalPermissions: <string>req.headers["permissions"], password: <string>req.headers["password"], token: token.toString()})
            writeConfiguration(config)
            res.send({code: 200, message: "Successfully created " + req.headers["username"]})
        }
    } else {
        if (enchanceRead().storageLocation == "|||||||||tampered|||||||||") {
            res.status(500).send({code: 500, message: "It looks like the configuration file has been tampered with."})
        } else {
            res.status(500).send({code: 500, message: "SFM hasn't been configured yet."})
        }
    }

}
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