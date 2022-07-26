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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lexer_1 = __importDefault(require("./lexer"));
const token = __importStar(require("../token/token"));
const input = `let five = 5;
let ten = 10;

let add = fn(x, y) {
  x + y;
};

let result = add(five, ten);
!-/*5;
5 < 10 > 5;

if (5 < 10) {
	return true;
} else {
	return false;
}

10 == 10;
10 != 9;
`;
const tests = [
    { Type: token.LET, Literal: "let" },
    { Type: token.IDENT, Literal: "five" },
    { Type: token.ASSIGN, Literal: "=" },
    { Type: token.INT, Literal: "5" },
    { Type: token.SEMICOLON, Literal: ";" },
    { Type: token.LET, Literal: "let" },
    { Type: token.IDENT, Literal: "ten" },
    { Type: token.ASSIGN, Literal: "=" },
    { Type: token.INT, Literal: "10" },
    { Type: token.SEMICOLON, Literal: ";" },
    { Type: token.LET, Literal: "let" },
    { Type: token.IDENT, Literal: "add" },
    { Type: token.ASSIGN, Literal: "=" },
    { Type: token.FUNCTION, Literal: "fn" },
    { Type: token.LPAREN, Literal: "(" },
    { Type: token.IDENT, Literal: "x" },
    { Type: token.COMMA, Literal: "," },
    { Type: token.IDENT, Literal: "y" },
    { Type: token.RPAREN, Literal: ")" },
    { Type: token.LBRACE, Literal: "{" },
    { Type: token.IDENT, Literal: "x" },
    { Type: token.PLUS, Literal: "+" },
    { Type: token.IDENT, Literal: "y" },
    { Type: token.SEMICOLON, Literal: ";" },
    { Type: token.RBRACE, Literal: "}" },
    { Type: token.SEMICOLON, Literal: ";" },
    { Type: token.LET, Literal: "let" },
    { Type: token.IDENT, Literal: "result" },
    { Type: token.ASSIGN, Literal: "=" },
    { Type: token.IDENT, Literal: "add" },
    { Type: token.LPAREN, Literal: "(" },
    { Type: token.IDENT, Literal: "five" },
    { Type: token.COMMA, Literal: "," },
    { Type: token.IDENT, Literal: "ten" },
    { Type: token.RPAREN, Literal: ")" },
    { Type: token.SEMICOLON, Literal: ";" },
    { Type: token.BANG, Literal: "!" },
    { Type: token.MINUS, Literal: "-" },
    { Type: token.SLASH, Literal: "/" },
    { Type: token.ASTERISK, Literal: "*" },
    { Type: token.INT, Literal: "5" },
    { Type: token.SEMICOLON, Literal: ";" },
    { Type: token.INT, Literal: "5" },
    { Type: token.LT, Literal: "<" },
    { Type: token.INT, Literal: "10" },
    { Type: token.GT, Literal: ">" },
    { Type: token.INT, Literal: "5" },
    { Type: token.SEMICOLON, Literal: ";" },
    { Type: token.IF, Literal: "if" },
    { Type: token.LPAREN, Literal: "(" },
    { Type: token.INT, Literal: "5" },
    { Type: token.LT, Literal: "<" },
    { Type: token.INT, Literal: "10" },
    { Type: token.RPAREN, Literal: ")" },
    { Type: token.LBRACE, Literal: "{" },
    { Type: token.RETURN, Literal: "return" },
    { Type: token.TRUE, Literal: "true" },
    { Type: token.SEMICOLON, Literal: ";" },
    { Type: token.RBRACE, Literal: "}" },
    { Type: token.ELSE, Literal: "else" },
    { Type: token.LBRACE, Literal: "{" },
    { Type: token.RETURN, Literal: "return" },
    { Type: token.FALSE, Literal: "false" },
    { Type: token.SEMICOLON, Literal: ";" },
    { Type: token.RBRACE, Literal: "}" },
    { Type: token.INT, Literal: "10" },
    { Type: token.EQ, Literal: "==" },
    { Type: token.INT, Literal: "10" },
    { Type: token.SEMICOLON, Literal: ";" },
    { Type: token.INT, Literal: "10" },
    { Type: token.NOT_EQ, Literal: "!=" },
    { Type: token.INT, Literal: "9" },
    { Type: token.SEMICOLON, Literal: ";" },
    { Type: token.EOF, Literal: "" },
];
const l = new lexer_1.default(input);
tests.forEach(v => {
    const nextToken = l.nextToken();
    test(`${nextToken.Type} === ${v.Type}`, () => {
        expect(nextToken).toEqual(v);
    });
});
