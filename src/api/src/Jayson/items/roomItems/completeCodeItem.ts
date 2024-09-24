import { ActionResult } from "../../../base/actionResults/ActionResult";
import { TextActionResult } from "../../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../../base/actions/ExamineAction";
import { Item } from "../../../base/gameObjects/Item";

export const completeCodeItemAlias: string = "fullcode";

export class completeCodeItem extends Item implements Examine {
    public constructor() { 
        super(completeCodeItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "1986";
    }
    
    public examine(): ActionResult | undefined {
        return new TextActionResult(["The full code to open the vault. It says '1986'."]);
    }
    
}