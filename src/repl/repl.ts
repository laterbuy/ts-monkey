import readline from "readline";
import * as os from "os";
import Lexer from "../lexer/lexer";
import { token } from "../token/tokenConst";

const ScannerClose = {
  exit: "exit",
  quit: "quit",
};

const exits = [ScannerClose.exit, ScannerClose.quit];

const scanner = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function repl() {
  scanner.question("> ", (input) => {
    if (exits.includes(input)) return scanner.close();
    const l = new Lexer(input);
    for (let tok = l.nextToken(); tok.type != token.EOF; tok = l.nextToken()) {
      console.log(tok);
    }
    repl();
  });
}
export default function startRepl() {
  console.log(
    `Hello ${os.userInfo().username}! This is the Monkey programming language!`
  );
  console.log("Feel free to type in commands");
  repl();
}
