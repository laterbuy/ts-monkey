import { Token, TokenType } from "../token/tokenType";
import { token, keywords } from "../token/tokenConst";

export default class Lexer {
  input: string;
  position: number = 0; // current position in input (points to current char)
  readPosition: number = 0; // current reading position in input (after current char)
  ch: string = ""; // current char under examination
  constructor(input: string) {
    this.input = input;
    this.readChar();
  }
  /**
   * @description: 读取当前的字符
   * @return {*}
   */
  readChar() {
    if (this.readPosition >= this.input.length) {
      this.ch = "";
    } else {
      this.ch = this.input[this.readPosition];
    }
    this.position = this.readPosition;
    this.readPosition += 1;
  }

  /**
   * @description: 下一个token
   * @return {*}
   */
  nextToken(): Token {
    let tok = {} as Token;
    this.skipWhitespace();
    switch (this.ch) {
      case "=":
        if (this.peekChar() == "=") {
          const ch = this.ch;
          this.readChar();
          const literal = ch + this.ch;
          tok = { type: token.EQ, literal };
        } else {
          tok = this.newToken(token.ASSIGN, this.ch);
        }
        break;
      case "+":
        tok = this.newToken(token.PLUS, this.ch);
        break;
      case "-":
        tok = this.newToken(token.MINUS, this.ch);
        break;
      case "!":
        if (this.peekChar() == "=") {
          const ch = this.ch;
          this.readChar();
          const literal = ch + this.ch;
          tok = { type: token.NOT_EQ, literal };
        } else {
          tok = this.newToken(token.BANG, this.ch);
        }
        break;
      case "/":
        tok = this.newToken(token.SLASH, this.ch);
        break;
      case "*":
        tok = this.newToken(token.ASTERISK, this.ch);
        break;
      case "<":
        tok = this.newToken(token.LT, this.ch);
        break;
      case ">":
        tok = this.newToken(token.GT, this.ch);
        break;
      case ";":
        tok = this.newToken(token.SEMICOLON, this.ch);
        break;
      case ",":
        tok = this.newToken(token.COMMA, this.ch);
        break;
      case "{":
        tok = this.newToken(token.LBRACE, this.ch);
        break;
      case "}":
        tok = this.newToken(token.RBRACE, this.ch);
        break;
      case "(":
        tok = this.newToken(token.LPAREN, this.ch);
        break;
      case ")":
        tok = this.newToken(token.RPAREN, this.ch);
        break;
      case "":
        tok.literal = "";
        tok.type = token.EOF;
        break;
      default:
        if (this.isLetter(this.ch)) {
          tok.literal = this.readIdentifier();
          tok.type = keywords[tok.literal] || token.IDENT;
          return tok;
        } else if (this.isDigit(this.ch)) {
          tok.type = token.INT;
          tok.literal = this.readNumber();
          return tok;
        } else {
          tok = this.newToken(token.ILLEGAL, this.ch);
        }
    }

    this.readChar();
    return tok;
  }

  /**
   * @description: 循环跳过各种空格和换行
   * @return {*}
   */
  skipWhitespace() {
    while (
      this.ch == " " ||
      this.ch == "\t" ||
      this.ch == "\n" ||
      this.ch == "\r"
    ) {
      this.readChar();
    }
  }

  /**
   * @description: 查看下一个字符
   * @return {*}
   */
  peekChar(): string {
    if (this.readPosition >= this.input.length) {
      return "";
    } else {
      return this.input[this.readPosition];
    }
  }

  /**
   * @description: 循环读取变量名
   * @return {*}
   */
  readIdentifier(): string {
    const position = this.position;
    while (this.isLetter(this.ch)) {
      this.readChar();
    }
    return this.input.slice(position, this.position);
  }

  /**
   * @description: 判断是否是声明的变量名
   * @param {string} ch
   * @return {*}
   */
  isLetter(ch: string): boolean {
    return ("a" <= ch && ch <= "z") || ("A" <= ch && ch <= "Z") || ch == "_";
  }

  /**
   * @description: 判断是否是数字
   * @param {string} ch
   * @return {boolean}
   */
  isDigit(ch: string): boolean {
    return "0" <= ch && ch <= "9";
  }

  /**
   * @description: 返回新的token
   * @param {TokenType} tokenType
   * @param {string} ch
   * @return {*}
   */
  newToken(tokenType: TokenType, ch: string): Token {
    return { type: tokenType, literal: ch } as Token;
  }

  /**
   * @description: 循环读取数字
   * @return {*}
   */
  readNumber(): string {
    const position = this.position;
    while (this.isDigit(this.ch)) {
      this.readChar();
    }
    return this.input.slice(position, this.position);
  }
}
