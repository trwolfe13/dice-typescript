import { NodeType } from "../../src/ast/node-type";
import { Token, TokenType } from "../../src/lexer";
import * as Parser from "../../src/parser";
import { MockLexer } from "../helpers/mock-lexer";

describe("Parser", () => {
    describe("parseSimpleExpression", () => {
        it("can correctly parse a simple addition", () => {
            const lexer = new MockLexer([
                new Token(TokenType.NumberInteger, 0, "10"),
                new Token(TokenType.MathOpAdd, 2, "+"),
                new Token(TokenType.NumberInteger, 3, "6")
            ]);
            const parser = new Parser.Parser(lexer);
            const exp = parser.parseSimpleExpression();
            expect(exp.type).toBe(NodeType.Add);
            expect(exp.getChildCount()).toBe(2);
            expect(exp.getChild(0).type).toBe(NodeType.Integer);
            expect(exp.getChild(0).getAttribute("value")).toBe(10);
            expect(exp.getChild(1).type).toBe(NodeType.Integer);
            expect(exp.getChild(1).getAttribute("value")).toBe(6);
        });
        it("can correctly parse a simple subtraction", () => {
            const lexer = new MockLexer([
                new Token(TokenType.NumberInteger, 0, "10"),
                new Token(TokenType.MathOpSubtract, 2, "-"),
                new Token(TokenType.NumberInteger, 3, "6")
            ]);
            const parser = new Parser.Parser(lexer);
            const exp = parser.parseSimpleExpression();
            expect(exp.type).toBe(NodeType.Subtract);
            expect(exp.getChildCount()).toBe(2);
            expect(exp.getChild(0).type).toBe(NodeType.Integer);
            expect(exp.getChild(0).getAttribute("value")).toBe(10);
            expect(exp.getChild(1).type).toBe(NodeType.Integer);
            expect(exp.getChild(1).getAttribute("value")).toBe(6);
        });
        it("can correctly parse a simple negation", () => {
            const lexer = new MockLexer([
                new Token(TokenType.MathOpSubtract, 0, "-"),
                new Token(TokenType.NumberInteger, 1, "4")
            ]);
            const parser = new Parser.Parser(lexer);
            const exp = parser.parseSimpleExpression();
            expect(exp.type).toBe(NodeType.Negate);
            expect(exp.getChildCount()).toBe(1);
            expect(exp.getChild(0).type).toBe(NodeType.Integer);
            expect(exp.getChild(0).getAttribute("value")).toBe(4);
        });
        it("can correctly parse multiple operators", () => {
            const lexer = new MockLexer([
                new Token(TokenType.NumberInteger, 0, "4"),
                new Token(TokenType.MathOpAdd, 1, "+"),
                new Token(TokenType.NumberInteger, 2, "3"),
                new Token(TokenType.MathOpSubtract, 3, "-"),
                new Token(TokenType.NumberInteger, 4, "1")
            ]);
            const parser = new Parser.Parser(lexer);
            const exp = parser.parseSimpleExpression();
            expect(exp.type).toBe(NodeType.Subtract);
            expect(exp.getChildCount()).toBe(2);

            const lhs = exp.getChild(0);
            expect(lhs.type).toBe(NodeType.Add);
            expect(lhs.getChildCount()).toBe(2);
            expect(lhs.getChild(0).type).toBe(NodeType.Integer);
            expect(lhs.getChild(0).getAttribute("value")).toBe(4);
            expect(lhs.getChild(1).type).toBe(NodeType.Integer);
            expect(lhs.getChild(1).getAttribute("value")).toBe(3);

            const rhs = exp.getChild(1);
            expect(rhs.type).toBe(NodeType.Integer);
            expect(rhs.getAttribute("value")).toBe(1);
        });
    });
});