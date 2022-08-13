/*
 * @Author: houbb
 * @Date: 2022-08-16 11:45:53
 * @LastEditTime: 2022-08-16 11:47:00
 * @LastEditors: houbb
 * @Description: 
 */
import { Token } from '../token/tokenType';
import { IExpression } from './astType';

export class IntegerLiteral implements IExpression {
  token: Token;
  value: number;

  constructor(token: Token, value: number) {
    this.token = token;
    this.value = value;
  }

  tokenLiteral() {
    return this.token.literal;
  }

  string() {
    return this.token.literal;
  }
  expressionNode() {}
}
