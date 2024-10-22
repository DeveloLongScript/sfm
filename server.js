import { createServer } from "http"
import { parse } from "url"
import next from "next"
import * as fs from "fs"
import enable from "./terminalPacketIO.js"
import * as path from "path"
const dev = process.env.NODE_ENV != "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  var server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    // handle other requests using next  default behavior
    handle(req, res, parsedUrl);
  })
  server.listen(3000, (err) => {
    
    // figure out if the configuration folder exists yet
    if (!fs.existsSync("configuration/")) {
      fs.mkdirSync("configuration/");
      fs.writeFileSync(
        "configuration/settings.yml",
        "# DO NOT EDIT THIS FILE \n# This file is designed to be edited by \n# using the graphical editor or the API.\nsetupYet: false"
      );
      fs.writeFileSync("configuration/stats.yml", "apiUsage:");
    }

    enable(server)

    if (err) throw err;
  });
});
