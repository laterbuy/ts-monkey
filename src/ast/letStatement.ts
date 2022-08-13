import { Token } from "../token/tokenType";
import { IExpression, IStatement } from "./astType";
import Identifier from "./identifier";

class LetStatement implements IStatement {
  token: Token;
  name!: Identifier;
  value!: IExpression;
  constructor(token: Token) {
    this.token = token;
  }
  statementNode() {}
  tokenLiteral() {
    return this.token.literal
  }
  string() {
    const strings = [this.tokenLiteral(), ' ', this.name.string(), ' = '];

    if (this.value !== null) {
      strings.push(this.value.string());
    }

    strings.push(';');

    return strings.join('');
  }
}

export default LetStatement;
