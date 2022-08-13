/*
 * @Author: houbb
 * @Date: 2022-08-12 18:31:20
 * @LastEditTime: 2022-08-15 19:34:07
 * @LastEditors: houbb
 * @Description: 
 */
import { Token } from "../token/tokenType";
import { IExpression, IStatement } from "./astType";

class returnStatement implements IStatement {
  token: Token;
  returnValue!: IExpression;
  constructor(token: Token) {
    this.token = token;
  }
  statementNode() {}
  tokenLiteral() {
    return this.token.literal
  }
  string() {
    const strings = [this.tokenLiteral(), ' '];

    if (this.returnValue !== null) {
      strings.push(this.returnValue.string());
    }

    strings.push(';');

    return strings.join('');
  }
}

export default returnStatement;
