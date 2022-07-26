"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const token = __importStar(require("../token/token"));
class Lexer {
    constructor(input) {
        this.input = input;
        this.readPosition = 0;
        this.position = 0;
        this.ch = '';
        this.readChar();
    }
    readChar() {
        if (this.readPosition >= this.input.length) {
            this.ch = "";
        }
        else {
            this.ch = this.input[this.readPosition];
        }
        this.position = this.readPosition;
        this.readPosition += 1;
    }
    nextToken() {
        let tok = {};
        this.skipWhitespace();
        switch (this.ch) {
            case "=":
                if (this.peekChar() == "=") {
                    const ch = this.ch;
                    this.readChar();
                    const literal = ch + this.ch;
                    tok = { Type: token.EQ, Literal: literal };
                }
                else {
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
                    tok = { Type: token.NOT_EQ, Literal: literal };
                }
                else {
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
                tok.Literal = "";
                tok.Type = token.EOF;
                break;
            default:
                if (this.isLetter(this.ch)) {
                    tok.Literal = this.readIdentifier();
                    tok.Type = token.keywords[tok.Literal] || token.IDENT;
                    return tok;
                }
                else if (this.isDigit(this.ch)) {
                    tok.Type = token.INT;
                    tok.Literal = this.readNumber();
                    return tok;
                }
                else {
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
        while (this.ch == " " ||
            this.ch == "\t" ||
            this.ch == "\n" ||
            this.ch == "\r") {
            this.readChar();
        }
    }
    peekChar() {
        if (this.readPosition >= this.input.length) {
            return "";
        }
        else {
            return this.input[this.readPosition];
        }
    }
    readIdentifier() {
        const position = this.position;
        while (this.isLetter(this.ch)) {
            this.readChar();
        }
        return this.input.slice(position, this.position);
    }
    isLetter(ch) {
        return ("a" <= ch && ch <= "z") || ("A" <= ch && ch <= "Z") || ch == "_";
    }
    isDigit(ch) {
        return "0" <= ch && ch <= "9";
    }
    newToken(tokenType, ch) {
        return { Type: tokenType, Literal: ch };
    }
    readNumber() {
        const position = this.position;
        while (this.isDigit(this.ch)) {
            this.readChar();
        }
        return this.input.slice(position, this.position);
    }
}
exports.default = Lexer;
