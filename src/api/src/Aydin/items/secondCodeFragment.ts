import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";

export const secondCodeFragmentAlias: string = "second-code-fragment";
export class secondCodeFragment extends Item implements Examine {
    public constructor() {
        super(secondCodeFragmentAlias, ExamineActionAlias);
    }

    public name(): string {
        return "9";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "The code, with its cryptic numbers and symbols, unfolds before you, hinting at its hidden logic and purpose. Among them, you see the number 7",
        ]);
    }

    public interact(): ActionResult | undefined {
        return new TextActionResult(["You already have the code in your inventory"]);
    }
}