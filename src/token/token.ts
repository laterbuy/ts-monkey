// 非法字符和结束符
export const ILLEGAL = "ILLEGAL";
export const EOF = "EOF";

// Identifiers + int  标识符和数字
export const IDENT = "IDENT"; // add; foobar; x; y; ...
export const INT = "INT"; // 1343456

// Operators
export const ASSIGN = "=";
export const PLUS = "+";
export const MINUS = "-";
export const BANG = "!";
export const ASTERISK = "*";
export const SLASH = "/";

export const LT = "<";
export const GT = ">";

export const EQ = "==";
export const NOT_EQ = "!=";

// Delimiters 分隔符
export const COMMA = ",";
export const SEMICOLON = ";";

export const LPAREN = "(";
export const RPAREN = ")";
export const LBRACE = "{";
export const RBRACE = "}";

// Keywords 关键字
export const FUNCTION = "FUNCTION";
export const LET = "LET";
export const TRUE = "TRUE";
export const FALSE = "FALSE";
export const IF = "IF";
export const ELSE = "ELSE";
export const RETURN = "RETURN";

export const keywords: {[x: string]: string} = {
  fn: FUNCTION,
  let: LET,
  true: TRUE,
  false: FALSE,
  if: IF,
  else: ELSE,
  return: RETURN,
};
