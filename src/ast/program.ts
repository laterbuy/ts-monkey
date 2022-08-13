/*
 * @Author: houbb
 * @Date: 2022-07-28 19:14:26
 * @LastEditTime: 2022-08-16 09:39:16
 * @LastEditors: houbb
 * @Description:
 */

import { IStatement } from "./astType";


class Program {
  statements: IStatement[] = [];
  tokenLiteral() {
    if (this.statements.length > 0) {
      return this.statements[0].tokenLiteral()
    } else {
      return '';
    }
  }
  string():string {
    return this.statements.map(v => v.string()).join('');
  }
}

export default Program
