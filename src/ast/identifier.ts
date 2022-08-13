/*
 * @Author: houbb
 * @Date: 2022-07-28 19:33:08
 * @LastEditTime: 2022-08-15 19:34:56
 * @LastEditors: houbb
 * @Description: 标识符
 */
import { Token } from "../token/tokenType";

export interface IIdentifier {
  token: Token;
  value: string;
}

class Identifier implements IIdentifier {
  token: Token;
  value: string;
  constructor(token: Token, value: string) {
    this.token = token;
    this.value = value;
  }
  expressionNode() {}
  tokenLiteral() {
    return this.token.literal
  }
  string() {
    return this.value;
  }
}

export default Identifier;
