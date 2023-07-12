import * as socketio from "socket.io-client";
import React, { useEffect } from "react";
import { Terminal, ITheme } from "xterm";
import "xterm/css/xterm.css";
import "../styles/Terminal.css";
import "@fontsource/jetbrains-mono";
import { FitAddon } from "xterm-addon-fit";
import * as FontAddon from "xterm-webfont";
import { WebLinksAddon } from "xterm-addon-web-links";
import { TitleComponent } from "../components/TitleComp";

var terminalAlreadyThere = false;
export default function TerminalPage() {
  return (
    <>
      <TerminalU />
    </>
  );
}
export const TerminalU = () => {
  var xtermRef: HTMLDivElement | null;

  React.useEffect(() => {
    if (terminalAlreadyThere == false) {
      terminalAlreadyThere = true;
      var fit = new FitAddon();
      var fontaddon = new FontAddon();
      var theme: ITheme = {
        black: "#282c34",
        red: "#e06c75",
        green: "#98c379",
        yellow: "#e5c07b",
        blue: "#61afef",
        magenta: "#c678dd",
        cyan: "#56b6c2",
        white: "#dcdfe4",
        brightBlack: "#282c34",
        brightRed: "#e06c75",
        brightGreen: "#98c379",
        brightYellow: "#e5c07b",
        brightBlue: "#61afef",
        brightMagenta: "#c678dd",
        brightCyan: "#56b6c2",
        brightWhite: "#dcdfe4",
        background: "#191919",
        foreground: "#dcdfe4",
        selectionBackground: "#474e5d",
        cursorAccent: "#a3b3cc",
      };
      // You can call any method in XTerm.js by using 'xterm xtermRef.current.terminal.[What you want to call]
      var term = new Terminal({
        fontFamily:
          "SF Mono, Cascadia Code, Fira Mono, courier-new, courier, monospace",
        fontSize: 16,
        fontWeight: 100,
        theme: theme,
      });
      (term as any).open(xtermRef as HTMLDivElement);
      term.loadAddon(new WebLinksAddon());
      term.loadAddon(fontaddon);
      fit.activate(term);
      fit.fit();

      term.onResize((cols, rows) => {
        console.log(cols + ", " + rows);
        socket.emit("resize", cols, rows);
      });
      term.onData((key) => {
        socket.emit("keyPress", key);
      });

      var socket = socketio.connect("ws://localhost:3000");

      socket.on("newOutput", (data) => {
        term.write(data);
      });
    }
  }, []);

  return (
    // Create a new terminal and set it's ref.
    <div style={{ padding: 3 }}>
      <TitleComponent title="Terminal" caption="builtin" />
      <br />
      <div className="term">
        <div
          ref={(ref) => {
            xtermRef = ref;
          }}
          className="inner"
        />
      </div>
    </div>
  );
};
