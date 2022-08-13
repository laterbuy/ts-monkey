import { token } from "../token/tokenConst";
import Identifier from "./identifier";
import LetStatement from "./letStatement";
import Program from "./program";

/*
 * @Author: houbb
 * @Date: 2022-08-12 19:19:27
 * @LastEditTime: 2022-08-12 19:26:33
 * @LastEditors: houbb
 * @Description:
 */

test("returns the correct program string related to the source code", () => {
  // source code to be tested
  // let myVar = anotherVar;
  const program = new Program();
  const letStatemenet = new LetStatement({ type: token.LET, literal: "let" });
  const identifier = new Identifier(
    { type: token.IDENT, literal: "myVar" },
    "myVar"
  );

  const value = new Identifier(
    { type: token.IDENT, literal: "anotherVar" },
    "anotherVar"
  );

  letStatemenet.name = identifier;
  letStatemenet.value = value;
  program.statements.push(letStatemenet);

  expect(program.string()).toEqual("let myVar = anotherVar;");
});
