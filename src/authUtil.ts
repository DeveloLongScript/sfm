import { NextApiRequest } from "next";
import { ConfType, readConfiguration } from "./configUtil";
import { config } from "process";
import { enchanceRead } from "./enchanceUtil";

/**
 * check perms of the current session
 * @param req request to check
 * @param reqPerms what perms to require
 * @returns indicating if the user has the correct permissions
 */
export default function authenticate(
  req: NextApiRequest,
  reqPerms: String
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    // if setup yet (essential)
    if (enchanceRead().setupYet != false) {
      // cookie being logged in with
      var sessionCookie = req.cookies.loginToken;

      if (sessionCookie == undefined) {
        // resort to guest permissions
        var config: ConfType = readConfiguration();
        var allPerms = reqPerms.split("");
        // splits perms into list (^ and down)
        var allUserPerms = config.guestPermissions?.split("");
        var verifedPerms: string[] = [];
        // checks for all permissions qualifying
        allUserPerms?.forEach((perm) => {
          if (allPerms.includes(perm)) {
            verifedPerms.push(perm);
          }
        });
        var verifedString = "";

        // sorts them accordingly
        verifedPerms.forEach((perm) => {
          verifedString = verifedString.concat(perm);
        });
        // checks if they match
        if (reqPerms == verifedString) {
          resolve(true);
        } else {
          if (reqPerms.includes("A")) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      }
      // using current user permissions
      var config: ConfType = readConfiguration();
      var found = false;

      config.userList?.forEach((user) => {
        // finds appropriate user
        if (user.token == sessionCookie) {
          found = true;
          var allPerms = reqPerms.split("");
          // splits perms into list (^ and down)
          var allUserPerms = user.globalPermissions.split("");

          var verifedPerms: string[] = [];
          // checks for all permissions qualifying
          allUserPerms.forEach((perm) => {
            if (allPerms.includes(perm)) {
              verifedPerms.push(perm);
            }
          });

          var verifedString = "";
          // sorts them accordingly
          verifedPerms.forEach((perm) => {
            verifedString = verifedString.concat(perm);
          });
          // checks if they match
          if (reqPerms == verifedString) {
            resolve(true);
          } else {
            if (user.globalPermissions.includes("A")) {
              resolve(true);
            } else {
              resolve(false);
            }
          }
        }
        if (found == false) {
          // resort to guest permissions
          var config: ConfType = readConfiguration();
          var allPerms = reqPerms.split("");
          // splits perms into list (^ and down)
          var allUserPermsTwo = config.guestPermissions?.split("");
          var verifedPerms: string[] = [];
          // checks for all permissions qualifying
          allUserPermsTwo?.forEach((perm) => {
            if (allPerms.includes(perm)) {
              verifedPerms.push(perm);
            }
          });
          var verifedString = "";

          // sorts them accordingly
          verifedPerms.forEach((perm) => {
            verifedString = verifedString.concat(perm);
          });
          // checks if they match
          if (reqPerms == verifedString) {
            resolve(true);
          } else {
            if (reqPerms.includes("A")) {
              resolve(true);
            } else {
              resolve(false);
            }
          }
        }
      });
    } else {
      resolve(false);
    }
    console.log("nowhere");
  });
}
