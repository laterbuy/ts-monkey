/*
 * @Author: houbb
 * @Date: 2022-08-01 18:36:37
 * @LastEditTime: 2022-08-16 17:59:11
 * @LastEditors: houbb
 * @Description:
 */

import ExpressionStatement from "../ast/expressionStatement";
import { IntegerLiteral } from "../ast/integerLiteral";
import LetStatement from "../ast/letStatement";
import Lexer from "../lexer/lexer";
import Parser from "./parser";

const checkParserErrors = (p: Parser) => {
  const { errors } = p;
  if (errors.length === 1) {
    return;
  }
  errors.forEach((v) => {
    console.error(v);
  });
};

test(`test let statements`, () => {
  const input = `
    let x = 5;
    let y = 10;
    let foobar = 838383;
    `;
  const l = new Lexer(input);
  const p = new Parser(l);
  const program = p.parseProgram();
  // checkParserErrors(p)
  expect(program.statements.length).toEqual(3);
  const tests = ["x", "y", "foobar"];
  tests.forEach((v, i) => {
    const stmt = program.statements[i];
    expect(stmt.tokenLiteral()).toEqual("let");
    expect((stmt as LetStatement).name.value).toEqual(v);
    expect((stmt as LetStatement).name.tokenLiteral()).toEqual(v);
  });
});

test(`test return statements`, () => {
  const input = `
    return 5;
    return true;
    return foobar;
    `;
  const l = new Lexer(input);
  const p = new Parser(l);
  const program = p.parseProgram();
  // checkParserErrors(p)
  expect(program.statements.length).toEqual(3);
  const tests = ["5", true, "foobar"];
  tests.forEach((v, i) => {
    const stmt = program.statements[i];
    expect(stmt.tokenLiteral()).toEqual("return");
  });
});

test("test identifier expression", () => {
  const input = "foobar";
  const l = new Lexer(input);
  const p = new Parser(l);
  const program = p.parseProgram();
  checkParserErrors(p);
  const stmt = program.statements[0];
  const literal = (stmt as ExpressionStatement).expression;
  expect(program.statements.length).toEqual(1);
  expect((literal as IntegerLiteral).value).toEqual("foobar");
  expect((literal as IntegerLiteral).tokenLiteral()).toEqual("foobar");
});

test("test integer literal expression", () => {
  const input = "5;";
  const l = new Lexer(input);
  const p = new Parser(l);
  const program = p.parseProgram();
  checkParserErrors(p);
  const stmt = program.statements[0];
  const literal = (stmt as ExpressionStatement).expression;
  expect(program.statements.length).toEqual(1);
  expect((literal as IntegerLiteral).value).toEqual(5);
  expect((literal as IntegerLiteral).tokenLiteral()).toEqual("5");
});

test("test pase pdrfix expressions", () => {
  const input = [
    {input: '!5;', operator: '!', integerValue: 5 },
  ];
  
});
