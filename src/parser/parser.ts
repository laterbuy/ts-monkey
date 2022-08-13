/*
 * @Author: houbb
 * @Date: 2022-07-28 19:36:33
 * @LastEditTime: 2022-08-16 16:27:51
 * @LastEditors: houbb
 * @Description:
 */

import { IExpression, IStatement } from "../ast/astType";
import Identifier from "../ast/identifier";
import LetStatement from "../ast/letStatement";
import ReturnStatement from "../ast/returnStatement";
import ExpressionStatement from "../ast/expressionStatement";
import Program from "../ast/program";``
import Lexer from "../lexer/lexer";
import { token } from "../token/tokenConst";
import { Token, TokenType } from "../token/tokenType";
import { IntegerLiteral } from "../ast/integerLiteral";

type prefixParseFn = () => IExpression;
type infixParseFn = (v: IExpression) => IExpression;

enum precedency {
  _,
  LOWEST,
  EQUALS, // ==
  LESSGREATER, // > or <`
  SUM, // +
  PRODUCT, // *
  PREFIX, // -X or !X
  CALL, // myFunction(X)
}

const precedences: { [x: string]: precedency } = {
  EQ: precedency.EQUALS,
  NOT_EQ: precedency.EQUALS,
  LT: precedency.LESSGREATER,
  GT: precedency.LESSGREATER,
  PLUS: precedency.SUM,
  MINUS: precedency.SUM,
  SLASH: precedency.PRODUCT,
  ASTERISK: precedency.PRODUCT,
  LPAREN: precedency.CALL,
};

interface IParser {
  l: Lexer;
  curToken: Token;
  peekToken: Token;
  errors: string[];
  // 前缀解析函数
  prefixParseFns: { [x: TokenType]: prefixParseFn };
  // 中缀解析函数
  infixParseFns: { [x: TokenType]: infixParseFn };
}

class Parser implements IParser {
  l: Lexer;
  curToken: Token = {
    type: "",
    literal: ""
  };
  peekToken: Token = {
    type: "",
    literal: ""
  };
  errors: string[] = [];
  prefixParseFns: { [x: string]: prefixParseFn } = {};
  infixParseFns: { [x: string]: infixParseFn } = {};
  constructor(l: Lexer) {
    this.l = l;
    // 连续读取两个词法单元 设置curToken和peekToken
    this.nextToken();
    this.nextToken();

    this.registerPrefix(token.IDENT, this.parseIdentifier.bind(this));
    this.registerPrefix(token.INT, this.parseIntegerLiteral.bind(this));
    // this.registerPrefix(token.BANG, this.parsePrefixExpression.bind(this));
    // this.registerPrefix(token.MINUS, this.parsePrefixExpression.bind(this));
  }
  /**
   * @description: 读取lexer的下一个词法单元
   * @return {*}
   */
  nextToken() {
    this.curToken = this.peekToken;
    this.peekToken = this.l.nextToken();
  }
  /**
   * @description: 解释程序 
   * @return {Program}
   */
  parseProgram(): Program {
    const program = new Program();

    while (!this.curTokenIs(token.EOF)) {
      const stmt = this.parseStatement();
      if (stmt !== undefined) {
        program.statements.push(stmt);
      }
      this.nextToken();
    }


    return program;
  }

  /**
   * @description: 当前token类型判断
   * @param {TokenType} t
   * @return {*}
   */
  curTokenIs(t: TokenType): boolean {
    return this.curToken.type == t;
  }

  /**
   * @description: 检测下一个token的类型
   * @param {TokenType} t
   * @return {*}
   */
  peekTokenIs(t: TokenType): boolean {
    return this.peekToken.type == t;
  }

  /**
   * @description: 根据token类型解析 let return
   * @return {*}
   */
  parseStatement(): IStatement {
    switch (this.curToken.type) {
      case token.LET:
        return this.parseLetStatement();
      case token.RETURN:
        return this.parseReturnStatement();
      default:
        return this.parseExpressionStatement();
    }
  }
  /**
   * @description: 解析let语句
   * @return {*}
   */
  parseLetStatement(): LetStatement {
    const stmt = new LetStatement(this.curToken);

    if (!this.expectPeek(token.IDENT)) {
      return undefined as unknown as LetStatement;
    }

    stmt.name = new Identifier(this.curToken, this.curToken.literal);

    if (!this.expectPeek(token.ASSIGN)) {
      return undefined as unknown as LetStatement;
    }

    this.nextToken();

    stmt.value = this.parseExpression(precedency.LOWEST);

    if (this.peekTokenIs(token.SEMICOLON)) {
      this.nextToken();
    }

    return stmt;
  }
  /**
   * @description: 解析return语句
   * @return {*}
   */
  parseReturnStatement(): ReturnStatement{
    const stmt = new ReturnStatement(this.curToken);

    this.nextToken();

    stmt.returnValue = this.parseExpression(precedency.LOWEST);

    if (this.peekTokenIs(token.SEMICOLON)) {
      this.nextToken();
    }
    return stmt;
  }
  /**
   * @description: 解析表达式语句
   * @return {*}
   */
  parseExpressionStatement() : ExpressionStatement{
    const statement = new ExpressionStatement(this.curToken);
    const expression = this.parseExpression(precedency.LOWEST);

    if (expression === undefined) {
      return undefined as unknown as ExpressionStatement;
    }

    statement.expression = expression;

    if (this.peekTokenIs(token.SEMICOLON)) {
      this.nextToken();
    }

    return statement;
  }
  /**
   * @description: 解析表达式
   * @param {number} precedence
   * @return {*}
   */
   parseExpression(precedence: number): IExpression {
    const prefix = this.prefixParseFns[this.curToken.type];
    if (prefix === undefined) {
      this.noPrefixParseFnError(this.curToken.type);
      return undefined as unknown as IExpression;
    }

    let leftExp = prefix();

    while (!this.peekTokenIs(token.SEMICOLON) && precedence < this.peekPrecedence()) {
      const infix = this.infixParseFns[this.peekToken.type];
      if (infix === undefined) {
        return leftExp;
      }

      this.nextToken();

      leftExp = infix(leftExp);
    }

    return leftExp;
  }
  /**
   * @description: 根据类型获取下一个token 
   * @param {TokenType} t
   * @return {*}
   */  
  expectPeek(t: TokenType): boolean {
    if (this.peekTokenIs(t)) {
      this.nextToken();
      return true;
    } else {
      this.peekError(t);
      return false;
    }
  }
  /**
   * @description: 下一个token类型异常错误
   * @param {TokenType} t
   * @return {*}
   */
  peekError(t: TokenType) {
    const msg = `expected next token to be ${t}, got ${this.peekToken.type} instead`;
    this.errors.push(msg);
  }
  noPrefixParseFnError(t: TokenType) {
    const msg = `no prefix parse function for ${t} found`;
    this.errors.push(msg);
  }
  peekPrecedence(): number {
    return precedences[this.peekToken.type] || precedency.LOWEST;
  }
  registerPrefix(tokenType: TokenType, fn: prefixParseFn) {
    this.prefixParseFns[tokenType] = fn;
  }
  registerInfix(tokenType: TokenType, fn: infixParseFn) {
    this.infixParseFns[tokenType] = fn;
  }
  parseIdentifier() {
    return new Identifier(this.curToken, this.curToken.literal);
  }

  private parseIntegerLiteral() {
    return new IntegerLiteral(
      this.curToken,
      parseInt(this.curToken.literal)
    );
  }

  // private parsePrefixExpression() {
  //   const expression = new PrefixExpression(
  //     this.curToken,
  //     this.curToken.literal
  //   );

  //   this.nextToken();

  //   const rightExpression = this.parseExpression(precedency.PREFIX);

  //   if (rightExpression) {
  //     expression.right = rightExpression;
  //   }

  //   return expression;
  // }
}

export default Parser;
