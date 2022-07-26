"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keywords = exports.RETURN = exports.ELSE = exports.IF = exports.FALSE = exports.TRUE = exports.LET = exports.FUNCTION = exports.RBRACE = exports.LBRACE = exports.RPAREN = exports.LPAREN = exports.SEMICOLON = exports.COMMA = exports.NOT_EQ = exports.EQ = exports.GT = exports.LT = exports.SLASH = exports.ASTERISK = exports.BANG = exports.MINUS = exports.PLUS = exports.ASSIGN = exports.INT = exports.IDENT = exports.EOF = exports.ILLEGAL = void 0;
exports.ILLEGAL = "ILLEGAL";
exports.EOF = "EOF";
// Identifiers + literals
exports.IDENT = "IDENT"; // add; foobar; x; y; ...
exports.INT = "INT"; // 1343456
// Operators
exports.ASSIGN = "=";
exports.PLUS = "+";
exports.MINUS = "-";
exports.BANG = "!";
exports.ASTERISK = "*";
exports.SLASH = "/";
exports.LT = "<";
exports.GT = ">";
exports.EQ = "==";
exports.NOT_EQ = "!=";
// Delimiters
exports.COMMA = ",";
exports.SEMICOLON = ";";
exports.LPAREN = "(";
exports.RPAREN = ")";
exports.LBRACE = "{";
exports.RBRACE = "}";
// Keywords
exports.FUNCTION = "FUNCTION";
exports.LET = "LET";
exports.TRUE = "TRUE";
exports.FALSE = "FALSE";
exports.IF = "IF";
exports.ELSE = "ELSE";
exports.RETURN = "RETURN";
exports.keywords = {
    fn: exports.FUNCTION,
    let: exports.LET,
    true: exports.TRUE,
    false: exports.FALSE,
    if: exports.IF,
    else: exports.ELSE,
    return: exports.RETURN,
};
