import chalk from "chalk";
import ora from "ora";
import * as fs from "fs";
import * as path from "path";
import YAML from "yaml";
import * as pty from "node-pty";
import { Server } from "socket.io";
console.log();
var nextCode = 1;


export default function enable(server) {
  var setupYet = YAML.parse(
    fs.readFileSync("configuration/settings.yml", "utf-8")
  ).setupYet;
  const spinner = ora("Getting ready.....");
  spinner.start();
  const isWin = process.platform === "win32";
  if (setupYet) {
    const root = YAML.parse(
      fs.readFileSync("configuration/settings.yml", "utf-8")
    ).storageLocation;
    const io = new Server(server, {
      cors: { origin: "http://localhost:3006" },
    });
    io.on("connection", (socket) => {
      var curCode = nextCode;
      var ptyProcess;
      nextCode++;
      console.log(
        chalk.green(
          "Session started for socket [#" + curCode + "] " + socket.id
        )
      );

      socket.on("start", (dir, auth) => {
        console.log(auth)
          if (
            auth == undefined ||
            !YAML.parse(
              fs.readFileSync("configuration/terminal-tokens.yml", "utf-8")
            ).validTokens.includes(auth)
          ) {
            socket.emit(
              "newOutput",
              chalk.red("Invalid authentication. (or non at all)")
            );
            socket.disconnect();
          } else {

            if (
              YAML.parse(
                fs.readFileSync("configuration/terminal-tokens.yml", "utf-8")
              ).validTokens.includes(auth)
            ) {

              var config = YAML.parse(
                fs.readFileSync("configuration/terminal-tokens.yml", "utf-8")
              )
              var newlist = [];
              for (const element of config.validTokens) {
                if (!element == auth) {
                  newlist.push(element)
                }
              }
              fs.writeFileSync("configuration/terminal-tokens.yml", YAML.stringify(config))
            }
          }
        

        console.log(
          chalk.green(
            "Creating new terminal for [#" + curCode + "] " + socket.id
          )
        );
        try {
          ptyProcess = pty.spawn(isWin ? "powershell.exe" : "bash", [], {
            name: "xterm-256color",
            cols: 80,
            rows: 30,
            cwd: dir == undefined ? process.env.HOME : path.join(root, dir),
            env: process.env,
          });
          ptyProcess.onData((data) => {
            socket.emit("newOutput", data);
          });

          ptyProcess.onExit((code) => {
            socket.emit(
              "newOutput",
              chalk.red("\nTerminal exited with code " + code.exitCode + ".")
            );
            console.log(
              chalk.red(
                "Terminal [#" +
                  curCode +
                  "] " +
                  socket.id +
                  " exited with code " +
                  code.exitCode
              )
            );
            socket.disconnect();
          });
          socket.on("resize", (cols, rows) => {
            ptyProcess.resize(cols, rows);
          });

          socket.on("keyPress", (press) => {
            if (press !== null) ptyProcess.write(press);
            else ptyProcess.write("\u001B");
          });
        } catch {
          socket.emit("newOutput", chalk.red("Error creating terminal."));
          socket.disconnect();
        }
      });
    });
  }

  spinner.succeed();
  console.log();
  console.log(
    chalk.green(
      `                            |‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|`
    )
  );
  console.log(
    chalk.green(
      `                            |           ` +
        chalk.bold("Simple File Manager") +
        `           |`
    )
  );
  console.log(
    chalk.green(
      "                            | " +
        chalk.green(" SFM is licensed under the MIT License ") +
        " |"
    )
  );
  console.log(
    chalk.green(
      "                            |_________________________________________|"
    )
  );
  console.log();
  console.log(chalk.grey("---INFO---"));
  process.versions;
  console.log(chalk.green("Node version:      ") + chalk.blue(process.version));
  console.log(
    chalk.green("V8 version:        ") + chalk.blue(process.versions.v8)
  );
  console.log(
    chalk.green("Operating System:  ") + chalk.blue(isWin ? "windows" : "unix")
  );
  console.log(
    chalk.green("  - Shell:         ") +
      chalk.blue(isWin ? "powershell" : "bash")
  );
  console.log(chalk.grey("---====---"));
  console.log();
  console.log(chalk.green(chalk.bold("✔  Now listening.....")));
}
