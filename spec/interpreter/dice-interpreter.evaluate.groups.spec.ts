import * as Ast from "../../src/ast";
import * as Interpreter from "../../src/interpreter";
import { MockRandomProvider } from "../helpers/mock-random-provider";

describe("DiceInterpreter", () => {
    describe("evaluate", () => {
        it("correctly evaluates a group {5, 2}.", () => {
            const group = Ast.Factory.create(Ast.NodeType.Group);

            group.addChild(Ast.Factory.create(Ast.NodeType.Integer).setAttribute("value", 5));
            group.addChild(Ast.Factory.create(Ast.NodeType.Integer).setAttribute("value", 2));

            const interpreter = new Interpreter.DiceInterpreter();

            interpreter.evaluate(group);
            expect(group.getChildCount()).toBe(2);
        });
        it("correctly evaluates a group with modifiers {5, 2}kh2.", () => {
            // TODO: Implement this test.
        });
    });
});