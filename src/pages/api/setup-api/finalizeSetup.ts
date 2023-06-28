import { ConfType, writeConfiguration } from "@/configUtil";
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    var body = JSON.parse(JSON.stringify(req.body));
    if (
      req.headers["password"] != undefined &&
      req.headers["username"] != undefined &&
      req.headers["path"] != undefined
    ) {
      var newType: ConfType = {
        setupYet: true,
        storageLocation: <string>req.headers["path"] ,
        userList: [],
        guestPermissions: "RWTS"
      };
      var token = makeToken(8);
      newType.userList?.forEach((ele) => {
        if (ele.token == token) {
          token = makeToken(8);
        }
      });

      newType.userList?.push({
        name: <string>req.headers["username"],
        globalPermissions: "A",
        password: <string>req.headers["password"],
        token: token.toString(),
      });
      writeConfiguration(newType);
      res.send({ code: 200, message: "Finished!" });
    } else {
      res.send({
        code: 400,
        message: "Invalid profile. ",
      });
    }
  }
};
function makeToken(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
