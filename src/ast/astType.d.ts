/*
 * @Author: houbb
 * @Date: 2022-07-28 19:05:40
 * @LastEditTime: 2022-08-16 09:39:08
 * @LastEditors: houbb
 * @Description:
 */

import ExpressionStatement from "./expressionStatement";
import LetStatement from "./letStatement";
import ReturnStatement from "./returnStatement";

export interface INode {
  tokenLiteral(): string;
  string(): string
}

export interface IStatement extends INode {
  statementNode: () => void;
}

export interface IExpression extends INode {
  expressionNode: () => void;
}
