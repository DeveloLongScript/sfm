import { NextApiRequest } from "next";
import { ConfType, readConfiguration } from "./configUtil";
import { config } from "process";
import { enchanceRead } from "./enchanceUtil";

export default function authenticate(
  req: NextApiRequest,
  reqPerms: String
): boolean {
  if (enchanceRead().setupYet != false) {
    var sessionCookie = req.cookies.loginToken;
    if (sessionCookie == undefined) {
      var config: ConfType = readConfiguration();
      var allPerms = reqPerms.split("");
      var allUserPerms = config.guestPermissions?.split("");
      var verifedPerms: string[] = [];
      allUserPerms?.forEach((perm) => {
        if (allPerms.includes(perm)) {
          verifedPerms.push(perm);
        }
      });
      var verifedString = "";

      verifedPerms.forEach((perm) => {
        verifedString = verifedString.concat(perm);
      });

      if (reqPerms == verifedString) {
        return true;
      } else {
        return false;
      }
    }

    var config: ConfType = readConfiguration();
    config.userList?.forEach((user) => {
      if (user.token == sessionCookie) {
        var allPerms = reqPerms.split("");
        var allUserPerms = user.globalPermissions.split("");
        var verifedPerms: string[] = [];
        allUserPerms.forEach((perm) => {
          if (allPerms.includes(perm)) {
            verifedPerms.push(perm);
          }
        });
        var verifedString = "";

        verifedPerms.forEach((perm) => {
          verifedString = verifedString.concat(perm);
        });

        if (reqPerms == verifedString) {
          return true;
        } else {
          return false;
        }
      }
    });
  } else {
    return false;
  }
  return false;
}
