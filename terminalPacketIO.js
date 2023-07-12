import chalk from "chalk";
import ora from "ora";
import * as pty from "node-pty";
import { Server } from "socket.io";
console.log();
var nextCode = 1;

export default function enable(server) {
  const spinner = ora("Getting ready.....");
  spinner.start();
  const isWin = process.platform === "win32";
  const io = new Server(server, {cors: {origin: "http://localhost:3006"}});
  io.on("connection", (socket) => {
    var curCode = nextCode;
    nextCode++;
    console.log(chalk.green("Creating new terminal for [#" + curCode + "] " + socket.id));
    var ptyProcess = pty.spawn(isWin ? "powershell.exe" : "bash", [], {
      name: "xterm-256color",
      cols: 80,
      rows: 30,
      cwd: process.env.HOME,
      env: process.env,
    });
  
    ptyProcess.onData((data) => {
      socket.emit("newOutput", data);
    });

    ptyProcess.onExit((code) => {
      socket.emit("newOutput", chalk.red("\nTerminal exited with code " + code.exitCode + "."))
      console.log(chalk.red("Terminal [#" + curCode + "] " + socket.id + " exited with code " + code.exitCode))
      socket.disconnect()
    })

    socket.on("resize", (cols, rows) => {
      ptyProcess.resize(cols, rows)
    })

    socket.on("keyPress", (press) => {
      if (press !== null) ptyProcess.write(press);
      else ptyProcess.write("\u001B");
    });
  });

  spinner.succeed();
  console.log();
  console.log(chalk.green(`                            |‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|`));
  console.log(chalk.green(`                            |           ` + chalk.bold("Simple File Manager") + `           |`));
  console.log(chalk.green("                            | " + chalk.green(" SFM is licensed under the MIT License ") + " |"))
  console.log(chalk.green("                            |_________________________________________|"))
  console.log();
  console.log(chalk.grey("---INFO---"));process.versions
  console.log(chalk.green("Node version:      ") + chalk.blue(process.version));
  console.log(chalk.green("V8 version:        ") + chalk.blue(process.versions.v8));
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
