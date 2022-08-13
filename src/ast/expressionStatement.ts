/*
 * @Author: houbb
 * @Date: 2022-08-12 18:56:59
 * @LastEditTime: 2022-08-15 19:35:22
 * @LastEditors: houbb
 * @Description: 
 */
import { Token } from "../token/tokenType";
import { IExpression, IStatement } from "./astType";

class ExpressionStatement implements IStatement {
  token: Token;
  expression!: IExpression;
  constructor(token: Token) {
    this.token = token;
  }
  statementNode() {}
  tokenLiteral():string {
    return this.token.literal
  }
  string() {
    return this.expression === null ? '' : this.expression.string();
  }
}

export default ExpressionStatement;
