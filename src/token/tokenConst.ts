export enum token {
  // 非法字符和结束符
  ILLEGAL = "ILLEGAL",
  EOF = "EOF",

  // Identifiers + int  标识符和数字
  IDENT = "IDENT", // add; foobar; x; y; ...
  INT = "INT", // 1343456

  // Operators
  ASSIGN = "=",
  PLUS = "+",
  MINUS = "-",
  BANG = "!",
  ASTERISK = "*",
  SLASH = "/",

  LT = "<",
  GT = ">",

  EQ = "==",
  NOT_EQ = "!=",

  // Delimiters 分隔符
  COMMA = ",",
  SEMICOLON = ";",

  LPAREN = "(",
  RPAREN = ")",
  LBRACE = "{",
  RBRACE = "}",

  // Keywords 关键字
  FUNCTION = "FUNCTION",
  LET = "LET",
  TRUE = "TRUE",
  FALSE = "FALSE",
  IF = "IF",
  ELSE = "ELSE",
  RETURN = "RETURN",
}

export const keywords: {[x: string]: string} = {
  fn: token.FUNCTION,
  let: token.LET,
  true: token.TRUE,
  false: token.FALSE,
  if: token.IF,
  else: token.ELSE,
  return: token.RETURN,
};
