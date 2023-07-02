import express from "express";
import * as http from "http";
import chalk from "chalk";
import ora from "ora";
import * as fs from "fs";
import * as pty from "node-pty";
import { Server } from "socket.io";
console.log();



export function enable(server) {
  const spinner = ora("Getting ready.....");
  spinner.start();
  const isWin = process.platform === "win32";
  const io = new Server(server);
  io.on("connection", (socket) => {
    console.log(chalk.green("Creating new terminal for " + socket.id));
    var ptyProcess = pty.spawn(isWin ? "powershell.exe" : "bash", [], {
      name: "xterm-color",
      cols: 80,
      rows: 30,
      cwd: process.env.HOME,
      env: process.env,
    });
  
    ptyProcess.onData((data) => {
      socket.emit("newOutput", data);
    });
    socket.on("keyPress", (press) => {
      if (press !== null) ptyProcess.write(press);
      else ptyProcess.write("\u001B");
    });
  });

  spinner.succeed();
  console.log();
  console.log(chalk.green(`SFM Terminal Service (using socket.io)`));
  console.log();
  console.log(chalk.grey("---INFO---"));
  console.log(chalk.green("Node version:      ") + chalk.blue(process.version));
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
