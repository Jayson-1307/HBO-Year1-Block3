import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";

export const CodeItemAlias: string = "code-4";
export class CodeItem extends Item implements Examine {
    public constructor() {
        super(CodeItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "1";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "The code, with its cryptic numbers and symbols, unfolds before you, hinting at its hidden logic and purpose. Among them, the digit 7 stands out, suggesting a crucial element within its design.",
        ]);
    }

    public interact(): ActionResult | undefined {
        return new TextActionResult(["You already have the code in your inventory"]);
    }
}
